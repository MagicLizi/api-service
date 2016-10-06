 /**
 * Created by MagicLizi on 16/9/18.
 */


var requestFilter = module.exports;
var routeConfig = require("../z_configs/route.json");

//初始化route
requestFilter.initRoute = function(app)
{
   var length = routeConfig["length"];
   for(var i = 0; i < length ; i++)
   {
      var config = routeConfig[i];
      var routeName = config.name;
      var pathName = config.path;
      var routePath = "../routes/" + routeName;
      var route = require(routePath);
      app.use(pathName,route);
   }
}
