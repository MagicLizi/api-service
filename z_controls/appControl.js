/**
 * Created by lizi on 16/10/8.
 */
var appControl = module.exports;
var dataAccess = require('dataAccess');
var command = dataAccess.command;
var executor = dataAccess.executor;
var code = require("../z_util/code");
var netData = require("../z_models/netData");
//获取app信息
appControl.getAppInfo = function(appId,callback)
{
    var getInfoCommand = new command("SELECT * FROM app WHERE appId = ?",[appId]);
    executor.query("api-service",getInfoCommand,function(e,r)
    {
        var appInfoResult;
        if(e)
        {
            appInfoResult = new netData(code.app.getAppInfoError,{}, e.stack);
        }
        else
        {
            if(r.length <= 0)
            {
                appInfoResult = new netData(code.app.appIdNotExist,{},"appId:"+appId+"不存在!");
            }
            else
            {
                appInfoResult = new netData(code.success,r[0],"获取app信息成功!");
            }
        }
        callback(appInfoResult);
    });
}