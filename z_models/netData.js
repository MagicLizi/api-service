/**
 * Created by MagicLizi on 16/9/18.
 */

//协议数据
var netData = function(code,data,message)
{
    this["code"]    = code;
    this["data"]    = data;
    this["message"] = message;
}

module.exports = netData;