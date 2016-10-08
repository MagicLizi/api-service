/**
 * Created by MagicLizi on 16/9/18.
 */
var logControl = require("../z_controls/logControl");
//错误过滤器
var errorFilter = function(err,req,res,next)
{
    console.log("请求处理错误:"+err.stack);
    console.log("--------------------");

    var requestUrl = req.originalUrl;
    var method = req.method;
    var reqParams = {};
    if(method === "GET")
    {
        reqParams = req.query;
    }
    else if(method === "POST")
    {
        reqParams = req.body;
    }

    //记录log
    logControl.log(req.hostname + " | " + req.ip,requestUrl,JSON.stringify(reqParams),err.stack,function(logResult)
    {

    });
    next();
}

module.exports = errorFilter;