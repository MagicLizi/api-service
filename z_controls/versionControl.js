/**
 * Created by magiclizi on 2017/5/11.
 */
var versionControl = module.exports;
var dataAccess = require('dataAccess');
var command = dataAccess.command;
var executor = dataAccess.executor;
var code = require("../z_util/code");
var netData = require("../z_models/netData");

versionControl.getOnlineVersionInfo = function(appId,cv,platform,callback){
    //获取线上containerVersion
    var c = new command("SELECT * FROM onlineversion where platform = ? and appid = ?",[platform,appId]);
    var c1 = new command("SELECT * FROM version WHERE isValied = 1 AND minContainerVersion = ? AND platform = ? AND appid = ?",
        [cv,platform,appId]);
    executor.transaction('api-service',[c,c1],(e,r)=>{
        // console.log(r);

        var result;
        if(!e)
        {
            var downLoadUrl = r[1][0]["JSCodeUrl"];

            var versionInfo = {
                onLineContainerVersion : r[0][0]['cv'],
                onLineHotFixVersion : r[1][0]['version'],
                needShowHotFix : r[1][0]['need'],
                jsCodeUrl : downLoadUrl
            }
            // console.log(versionInfo);
            result = new netData(code.success,versionInfo,"获取版本信息成功!");
        }
        else
        {
            result = new netData(code.version.getOnlineVersionInfoError,{},e.stack);
        }
        callback(result);

    })

}


versionControl.appDownLoadUrl = function(cv,platform,callback){
    callback(new netData(code.success,{url:'http://www.baidu.com'},'success'));
}