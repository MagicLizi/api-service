/**
 * Created by MagicLizi on 2016/10/20.
 */
var upyunControl = module.exports;
var dataASccess = require('dataAccess');
var code = require("../z_util/code");
var netData = require("../z_models/netData");
var command = dataASccess.command;
var executor = dataASccess.executor;
var vrcrypto = require("../z_util/vrcrypto");
var Base64 = require('js-base64').Base64;
/**
 * 获取上传所需policy
 */
upyunControl.getSign = function(appId,bucket,fileUri,callback)
{
    //获取upyun 对应信息
    var upyunInfoCommand = new command('SELECT * FROM upyun WHERE appId = ? AND bucket = ?',[appId,bucket]);
    executor.query('api-service',upyunInfoCommand,function(e,r)
    {
        var signResult;
        if(e)
        {
            signResult = new netData(code.upyun.getUpyunInfoError,{},e.stack);
        }
        else
        {
            if(r.length === 0)
            {
                signResult = new netData(code.upyun.noneUpyunInfo,{},"没有对应的upyun信息！");
            }
            else
            {
                var saveKey = vrcrypto.toMD5(fileUri + new Date().getTime()/1000) + '.jpg';
                var upyunInfo = r[0];
                var secret = upyunInfo['secret'];
                var policyObj =
                {
                    'bucket' : bucket,
                    'expiration' : ~~((new Date().getTime() + 3600000)/1000),
                    'save-key' : saveKey
                }

                var policy = Base64.encode(JSON.stringify(policyObj));
                var signature = vrcrypto.toMD5(policy + "&" + secret);
                signResult = new netData(code.success,{
                    upLoadUrl:'http://v0.api.upyun.com/'+ bucket,
                    signature:signature,
                    policy:policy,
                    fileLoadDomain:'http://' + bucket + '.b0.upaiyun.com/'
                },"获取上传签名信息成功！");
                upyunControl.logUpload(appId,'http://' + bucket + '.b0.upaiyun.com/' + saveKey);
            }
        }
        callback(signResult);
    });
}


/**
 * 纪录
 */
upyunControl.logUpload = function(appId,fileUrl)
{
    var logCommand = new command('INSERT INTO uploadLog(appId,fileUrl,createAt) VALUES(?,?,?)',[appId,fileUrl,new Date().getTime()/1000]);
    executor.query('api-service',logCommand,function(e,r)
    {

    })
};