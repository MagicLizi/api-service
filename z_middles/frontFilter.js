/**
 * Created by MagicLizi on 16/9/18.
 */
var appControl = require("../z_controls/appControl");
var code = require("../z_util/code");
var netData = require("../z_models/netData");
var utilNext = require("../z_util/utilNext");
var vrcrypto = require("../z_util/vrcrypto");

//请求前置过滤器
var frontFilter = function(req,res,next)
{
   // console.log(req);
    var signature = req.headers.signature;
    var appId = req.headers.appid;
    var requestUrl = req.originalUrl;
    var method = req.method;
    var reqParams = {};
    var clearParams = {};
    if(method === "GET")
    {
        clearParams = JSON.parse(JSON.stringify(req.query));
        req.query.appId = appId;
        reqParams = req.query;
    }
    else if(method === "POST")
    {
        clearParams = JSON.parse(JSON.stringify(req.body));
        req.body.appId = appId;
        reqParams = req.body;
    }


    console.log("--------------------");
    console.log("开始处理请求:" + requestUrl);
    console.log("请求方法:" + method);
    console.log("请求参数:" + JSON.stringify(reqParams));

    if(requestUrl === "/" || requestUrl === "/favicon.ico")
    {
        next();
    }
    else
    {
        //验证签名
        verifySignature(appId,signature,clearParams,function(verifyResult)
        {
            if(verifyResult.code !== code.success)
            {
                utilNext.utilSend(verifyResult,res,next);
            }
            else
            {
                next();
            }
        })
    }
}

/**
 * 验证签名
 * @param signature
 * @param params
 */
var verifySignature = function(appId,signature,params,callback)
{
    appControl.getAppInfo(appId,function(appResult)
    {
       if(appResult.code === code.success)
       {
            //验证
           var appSecret = appResult["data"]["appSecret"];
           var hashStr = appId + "&" + appSecret + "&" + JSON.stringify(params);
           console.log("加密参数:"+hashStr);
           var serverSignature = vrcrypto.toHash(hashStr);
           console.log("当前sig:"+serverSignature);
           var verifyResult;
           if(serverSignature === signature)
           {
               verifyResult = new netData(code.success,{},"验证签名成功!");
           }
           else
           {
               verifyResult = new netData(code.app.signatureVerifyError,{appId:appId,signature:signature,params:params},"验证签名错误!")
           }
           callback(verifyResult);
       }
       else
       {
           callback(appResult);
       }
    })
}


module.exports = frontFilter;


