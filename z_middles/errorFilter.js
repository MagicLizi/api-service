/**
 * Created by MagicLizi on 16/9/18.
 */

//错误过滤器
var errorFilter = function(err,req,res,next)
{
    console.log("请求处理错误:"+err.stack);
    console.log("--------------------");
    next();
}

module.exports = errorFilter;