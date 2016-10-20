var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var frontFilter = require("./z_middles/frontFilter");
var requestFilter = require("./z_middles/requestFilter");
var backFilter = require("./z_middles/backFilter");
var errorFilter = require("./z_middles/errorFilter");
var dataAccess = require("dataAccess");
dataAccess.setPoolConfig(require("./z_configs/mysql.json"));
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//(1)前置过滤器
app.use(frontFilter);

//(2)路由中间件
requestFilter.initRoute(app);

//(3)后置过滤器
app.use(backFilter);

//(4)错误过滤器
app.use(errorFilter);

module.exports = app;


