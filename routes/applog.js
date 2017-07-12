/**
 * Created by magiclizi on 2017/7/12.
 */
var express = require('express');
var router = express.Router();
var utilNext = require("../z_util/utilNext");
var appLogControl = require('../z_controls/appLogControl');

router.post('/add', function(req,res,next){
    let appid = req.headers.appid;
    let userId = req.body['userId'];
    let log = req.body.log;
    appLogControl.addLog(appid,userId,log,result=>{
        utilNext.utilSend(result,res,next);
    })
})

module.exports = router;