var express = require('express');
var router = express.Router();
var utilNext = require("../z_util/utilNext");

/* GET home page. */
router.get('/', function(req, res, next)
{
  utilNext.utilRender(data,'index',res,next)
});



module.exports = router;
