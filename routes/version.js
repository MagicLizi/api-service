/**
 * Created by magiclizi on 2017/5/11.
 */
var express = require('express');
var router = express.Router();
var utilNext = require("../z_util/utilNext");
var versionControl = require('../z_controls/versionControl');
router.get('/onlineVersionInfo',function(req,res,next){
    let platform = req.headers['platform'];
    let cv = req.headers['cv'];
    let appId = req.query.appId;
    versionControl.getOnlineVersionInfo(appId,cv,platform,result=>{
        utilNext.utilSend(result,res,next);
    })
});

router.get('/appDownLoadUrl',function(req,res,next){
    let platform = req.headers['platform'];
    let cv = req.headers['cv'];
    versionControl.appDownLoadUrl(cv,platform,result=>{
        utilNext.utilSend(result,res,next);
    })
})

module.exports = router;