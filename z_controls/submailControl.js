/**
 * Created by lizi on 16/10/7.
 */
var submailControl = module.exports;
var MessageXSend = require("../z_models/submail/messageXSend");
var dataAccess = require('dataAccess');
var command = dataAccess.command;
var executor = dataAccess.executor;
var netData = require("../z_models/netData");
var code = require("../z_util/code");

//验证码长度
var verifyCodeLength = 6;
var verifyCoolDown = 60;
/**
 * 生成验证码
 */
var verifyCodeGen = function()
{
    //生成验证码
    var verifyCode = '';
    for(var i = 0;i < verifyCodeLength ;i++)
    {
        var num = Math.floor(Math.random()*10);
        verifyCode = verifyCode + (num + "");
    }
    return verifyCode;
}

/**
 * 刷新验证码记录
 * @param appId
 * @param mobile
 * @param callback
 */
submailControl.tryRefreshVerifyCode = function(appId,mobile,callback)
{
    //检查是否存在有效的
    var existCommand = new command("SELECT * FROM mobileVerify WHERE appId = ? AND mobile = ? AND isValied = 1",[appId,mobile]);
    executor.query('api-service',existCommand,function(e,r)
    {
        var refreshResult;
        if(e)
        {
            refreshResult = new netData(code.submail.refreshVerifyCodeError,{}, e.stack);
            callback(refreshResult);
        }
        else
        {
            if(r.length === 0)
            {
                var verifyCode = verifyCodeGen();
                //不存在插入
                var insertCommand = new command("INSERT INTO mobileVerify(appId,mobile,verifyCode,isValied,createAt) VALUES(?,?,?,?,?)",
                    [appId,mobile,verifyCode,1,parseInt(new Date().getTime()/1000)]);
                executor.query('api-service',insertCommand,function(e1,r1)
                {
                    if(e1)
                    {
                        refreshResult = new netData(code.submail.refreshVerifyCodeError,{}, e1.stack);
                        callback(refreshResult);
                    }
                    else
                    {
                        refreshResult = new netData(code.success,{code:verifyCode}, "刷新验证码成功!");
                        callback(refreshResult);
                    }
                });
            }
            else
            {
                var createAt = parseInt(r[0]["createAt"]);
                var curTime = parseInt(new Date().getTime()/1000);
                var dis = curTime - createAt;
                var id = r[0]["id"];
                if(dis >= verifyCoolDown)
                {
                    //设置无效
                    var updateCommand = new command("UPDATE mobileVerify SET isValied = 0 WHERE id = ?",[id]);
                    executor.query('api-service',updateCommand,function(e2,r2)
                    {
                        if(e2)
                        {
                            refreshResult = new netData(code.submail.refreshVerifyCodeError,{}, e2.stack);
                            callback(refreshResult);
                        }
                        else
                        {
                            //插入
                            var verifyCode = verifyCodeGen();
                            //不存在插入
                            var insertCommand = new command("INSERT INTO mobileVerify(appId,mobile,verifyCode,isValied,createAt) VALUES(?,?,?,?,?)",
                                [appId,mobile,verifyCode,1,parseInt(new Date().getTime()/1000)]);
                            executor.query('api-service',insertCommand,function(e1,r1)
                            {
                                if(e1)
                                {
                                    refreshResult = new netData(code.submail.refreshVerifyCodeError,{}, e1.stack);
                                    callback(refreshResult);
                                }
                                else
                                {
                                    refreshResult = new netData(code.success,{code:verifyCode}, "刷新验证码成功!");
                                    callback(refreshResult);
                                }
                            });
                        }
                    })
                }
                else
                {
                    refreshResult = new netData(code.submail.refreshVerifyCodeError,{}, "验证码获取频率过高,请稍后再试!");
                    callback(refreshResult);
                }
            }
        }
    });
}

/**
 * 发送短信验证码
 * @param appId
 * @param mobile
 * @param template
 * @param callback
 */
submailControl.sendVerifyCode = function(appId,mobile,template,callback)
{

    //尝试刷新验证码记录
    submailControl.tryRefreshVerifyCode(appId,mobile,function(refreshResult)
    {
        if(refreshResult.code === code.success)
        {
            submailControl.sendMessage(appId,mobile,template,refreshResult.data,function(sendMessageResult)
            {
                if(sendMessageResult.code !== code.success)
                {
                    callback(sendMessageResult);
                }
                else
                {
                    sendMessageResult.data.coolDown = verifyCoolDown;
                    callback(sendMessageResult);
                }
            })
        }
        else
        {
            callback(refreshResult);
        }
    });
}


/**
 * 发送短信
 * @param appId
 * @param mobile
 * @param template
 * @param callback
 */
submailControl.sendMessage = function(appId,mobile,template,messageParams,callback)
{
    //通过appid 获取 submail appid 和 appkey
    var submailCommand = new command("SELECT * FROM submail WHERE appId = ?",[appId]);
    executor.query('api-service',submailCommand,function(e,r)
    {
        var sendMessageResult;
        if(e)
        {
            sendMessageResult = new netData(code.submail.getSubmailAppInfoError,{}, e.stack);
            callback(sendMessageResult);
        }
        else
        {
            if(r.length > 0)
            {
                var submailInfo = r[0];
                var subAppId = submailInfo["submailAppId"];
                var appkey = submailInfo["appkey"];
                var messageXSend = new MessageXSend(subAppId,'normal',appkey);
                var messageVar = messageParams;
                messageXSend.add_to(mobile);
                messageXSend.set_project(template);
                for(var key in messageVar){
                    var v = messageVar[key];
                    messageXSend.add_var(key,v);
                }
                messageXSend.xsend(callback);
            }
            else
            {
                sendMessageResult = new netData(code.submail.submailAppNotExist,{},"submail应用不存在!" + appId);
                callback(sendMessageResult);
            }
        }
    });
};

submailControl.sendVoiceMessage = function(appId,mobile,template,messageParams,callback)
{
    var submailCommand = new command("SELECT * FROM submail WHERE appId = ?",[appId]);
    executor.query('api-service',submailCommand,function(e,r)
    {
        var sendMessageResult;
        if(e)
        {
            sendMessageResult = new netData(code.submail.getSubmailAppInfoError,{}, e.stack);
            callback(sendMessageResult);
        }
        else
        {
            if(r.length > 0)
            {
                var submailInfo = r[0];
                var subAppId = submailInfo["submailAppId"];
                var appkey = submailInfo["appkey"];
                var messageXSend = new MessageXSend(subAppId,'normal',appkey);
                var messageVar = messageParams;
                messageXSend.add_to(mobile);
                messageXSend.set_project(template);
                for(var key in messageVar){
                    var v = messageVar[key];
                    messageXSend.add_var(key,v);
                }
                messageXSend.vxsend(callback);
            }
            else
            {
                sendMessageResult = new netData(code.submail.submailAppNotExist,{},"submail应用不存在!" + appId);
                callback(sendMessageResult);
            }
        }
    });
};

/**
 * 验证短信验证码
 * @param appId
 * @param mobile
 * @param verifyCode
 * @param callback
 */
submailControl.verifyCode = function(appId,mobile,verifyCode,callback)
{
     var getCodeCommand = new command('SELECT * FROM mobileVerify WHERE mobile = ? AND appId = ? AND isValied = 1',[mobile,appId]);
     executor.query("api-service",getCodeCommand,function(e,r)
     {
         var verifyResult;
         if(e)
         {
             verifyResult = new netData(code.submail.getMobileVerifyCodeError,{}, e.stack);
             callback(verifyResult);
         }
         else
         {
             if(r.length <=0)
             {
                 verifyResult = new netData(code.submail.verifyCodeError,{}, "验证码错误!");
                 callback(verifyResult);
             }
             else
             {
                var realVerifyCode = r[0].verifyCode;
                if(realVerifyCode === verifyCode)
                {
                    //刷新验证码
                    var verifyCodeId = r[0].id;
                    var updateCommand = new command("UPDATE mobileVerify SET isValied = 0 WHERE id = ?",[verifyCodeId]);
                    executor.query('api-service',updateCommand,function(e1,r1)
                    {
                        if(e1)
                        {
                            verifyResult = new netData(code.submail.refreshVerifyCodeStateError,{}, "刷新验证码状态错误!");
                        }
                        else
                        {
                            verifyResult = new netData(code.success,{}, "验证码正确!");
                        }
                        callback(verifyResult);
                    })
                }
                else
                {
                    verifyResult = new netData(code.submail.verifyCodeError,{}, "验证码错误!");
                    callback(verifyResult);
                }
             }
         }
     });
}