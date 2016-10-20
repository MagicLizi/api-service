var express = require('express');
var router = express.Router();
var utilNext = require("../z_util/utilNext");
var code = require("../z_util/code");
var netData = require('../z_models/netData');
/* GET home page. */
router.get('/', function(req, res, next)
{
  var data = new netData(code.success,{title:'上传测试'},"成功");
  utilNext.utilRender(data,'index',res,next)
});



module.exports = router;
