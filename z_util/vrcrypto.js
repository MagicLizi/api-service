/**
 * Created by 1 on 2016/10/6.
 */
var crypto = require("crypto");
var secrectKey = "37c47d55eb8f9af81c4f193a060dfc6d";//vrdabaishu20161006!@#$%^^&*() md5 出来的

var vrcrypto = module.exports;

/**
 * 加密
 * @param str
 */
vrcrypto.toSecret = function(str)
{
    var cipher = crypto.createCipher('blowfish',secrectKey);
    var crypted =cipher.update(str,'utf8','hex');
    crypted += cipher.final('hex');
    return crypted;
}

/**
 * 解密
 * @param secret
 */
vrcrypto.toBasic = function(secret)
{
    var decipher = crypto.createDecipher('blowfish',secrectKey);
    var deciphered = decipher.update(secret,'hex','utf8');
    deciphered += decipher.final('utf8');
    return deciphered;
}

/**
 * haxi
 * @param str
 */
vrcrypto.toHash = function(str)
{
    var sha1 = crypto.createHash('sha1');
    sha1.update(str);
    return sha1.digest('hex');
}