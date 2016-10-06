var express = require('express');
var router = express.Router();
var utilNext = require("../z_util/utilNext");
var testControl = require("../z_controls/testControl");
/* GET home page. */
router.get('/', function(req, res, next)
{
  testControl.test(1,'2131',function(data)
  {
    utilNext.utilRender(data,'index',res,next)
  });
});


router.post('/',function(req,res,next)
{
  testControl.test(1,'2131',function(data)
  {
    utilNext.utilSend(data,res,next)
  });
});

module.exports = router;
