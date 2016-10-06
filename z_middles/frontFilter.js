/**
 * Created by MagicLizi on 16/9/18.
 */

//请求前置过滤器
var frontFilter = function(req,res,next)
{
   // console.log(req);
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
    console.log("--------------------");
    console.log("开始处理请求:" + requestUrl);
    console.log("请求方法:" + method);
    console.log("请求参数:" + JSON.stringify(reqParams));
    next();
}

module.exports = frontFilter;


