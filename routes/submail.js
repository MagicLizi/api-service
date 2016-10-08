/**
 * Created by lizi on 16/10/6.
 * 短信API 基于submail
 */
var express = require('express');
var router = express.Router();
var submailControl = require('../z_controls/submailControl');
var utilNext = require("../z_util/utilNext");
/**
 * 获取短信验证码
 */
router.get("/mobileVerifyCode",function(req,res,next)
{
    var mobile = req.query["mobile"];
    var template = req.query["template"];
    var appId = req.query["appId"];
    submailControl.sendVerifyCode(appId,mobile,template,function(sendResult)
    {
        utilNext.utilSend(sendResult,res,next);
    });
});


/**
 * 验证短信验证码
 */
router.post("/verifyCode",function(req,res,next)
{
    var mobile = req.body["mobile"];
    var verifyCode = req.body["verifyCode"];
    var appId = req.body['appId'];
    submailControl.verifyCode(appId,mobile,verifyCode,function(vResult)
    {
        utilNext.utilSend(vResult,res,next);
    })
});


/**
 * 获取邮件验证码
 */
router.get("/mailCode",function(req,res,next)
{

});

module.exports = router;