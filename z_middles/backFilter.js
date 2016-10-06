/**
 * Created by MagicLizi on 16/9/18.
 */

//请求后置过滤器
var backFilter = function(req,res,next)
{
    console.log("请求处理结果:" + JSON.stringify(res.netData));
    console.log("--------------------");
    next();
}

module.exports = backFilter;