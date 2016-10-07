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


/**
 * 生成验证码
 */
var verifyCodeGen = function()
{

};

/**
 * 发送短信验证码
 * @param appId
 * @param mobile
 * @param template
 * @param callback
 */
submailControl.sendVerifyCode = function(appId,mobile,template,callback)
{
    var verifyCode =
    {
        code:"12345"
    }
    submailControl.sendMessage(appId,mobile,template,verifyCode,function(sendMessageResult)
    {
        if(sendMessageResult.code !== code.success)
        {
            callback(sendMessageResult);
        }
        else
        {
            sendMessageResult.data.coolDown = 60;
            callback(sendMessageResult);
        }
    })
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