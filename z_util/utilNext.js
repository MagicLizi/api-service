/**
 * Created by MagicLizi on 16/9/18.
 */
var utilNext = module.exports;
var code = require("../z_util/code.js");
/**
 * 渲染页面
 */
utilNext.utilRender = function(netData,pageName,res,next)
{
    if(netData.code === code.success)
    {
        res.netData = netData;
        res.render(pageName, netData.data);
        next();
    }
    else
    {
        var error = new Error(JSON.stringify(netData));
        res.render('error', netData);
        next(error);
    }
}

/**
 * 处理结束返回数据
 */
utilNext.utilSend = function(netData,res,next)
{
    res.netData = netData;
    res.send(netData);
    var error = null;
    if(netData.code !== code.success)
    {
        error = new Error(JSON.stringify(netData));
    }
    next(error);
}

