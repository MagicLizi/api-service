/**
 * Created by lizi on 16/10/7.
 */
var logControl = module.exports;
var dataAccess = require("dataAccess");
var command = dataAccess.command;
var executor = dataAccess.executor;
var code  = require('../z_util/code');
var netData = require('../z_models/netData');
//记录log
logControl.log = function(fromHost,api,params,errorMessage,callback)
{
    var c = new command('INSERT INTO errorlog(fromHost,api,params,errorMessage,createAt) VALUES(?,?,?,?,?)',[fromHost,api,params,errorMessage,parseInt(new Date().getTime()/1000)]);
    executor.query('api-service',c,function(e,r)
    {
        var logResult;
        if(e)
        {
            logResult = new netData(code.log.logError,{}, e.stack);
        }
        else
        {
            logResult = new netData(code.success,{},"log记录成功!");
        }
        callback(logResult)
    });
}