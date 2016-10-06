/**
 * Created by MagicLizi on 16/9/18.*/

var testControl = module.exports;
var netData = require("../z_models/netData");
var code = require("../z_util/code");
testControl.test = function(param1,param2,callback)
{
    var returnData = new netData(code.success,{ title: 'Express' },"测试返回");
    callback(returnData);
}