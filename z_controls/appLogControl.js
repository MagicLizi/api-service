/**
 * Created by magiclizi on 2017/7/12.
 */
const AppLogControl = module.exports;
const dataAccess = require('dataAccess');
const command = dataAccess.command;
const executor = dataAccess.executor;
const code  = require('../z_util/code');
const netData = require('../z_models/netData');
AppLogControl.addLog = function(appId,userId,log,callback){
    let sql = new command('insert into appLog(appId,userId,log,createAt) values(?,?,?,?)',[appId,userId,log,~~(new Date().getTime()/1000)]);
    executor.query('api-service',sql,(e,r)=>{
        let result;
        if(e){
            result = new netData(code.appLog.addlogError,{},e.stack);
        }
        else{
            result = new netData(code.success,{},'添加成功');
        }
        callback(result);
    })
}