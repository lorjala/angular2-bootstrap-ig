'use strict';

var path = require('path');

var express = require('express');
var winston = require('winston');
var expressWinston = require('express-winston');

// Middleware
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var csurf = require('csurf');
var compression = require('compression');
var helmet = require('helmet');

var Express = function (app) {
  app.use(compression());

  app.use(express.static(path.join(__dirname, '../client/public')));

  app.use(expressWinston.logger({
    winstonInstance: winston,
    meta: false,
    expressFormat: true,
    colorize: true,
    ignoreRoute(req) {
      return !(req.url.match(/^\/api/));
    },
  }));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: false,
  }));

  app.use(cookieParser());

  if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
    app.use(csurf());
  }
};

module.exports = Express;
