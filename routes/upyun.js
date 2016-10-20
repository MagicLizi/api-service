/**
 * Created by MagicLizi on 2016/10/20.
 */
var express = require('express');
var router = express.Router();

var upyunControl = require('../z_controls/upyunControl');
var utilNext = require("../z_util/utilNext");

/**
 * 获取上传签名
 */
router.get('/uploadSign',function(req,res,next)
{
    var uploadBucket = req.query['bucket'];
    var appId = req.query["appId"];
    var fileUri = req.query['fileUri'];
    upyunControl.getSign(appId,uploadBucket,fileUri,function(signResult)
    {
        utilNext.utilSend(signResult,res,next);
    })
});


module.exports = router;