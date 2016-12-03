'use strict';

process.env.NODE_CONFIG_DIR = './config/env';

var http = require('http');

var config = require('config');
var express = require('express');
var winston = require('winston');
require('winston-daily-rotate-file');

// Initialize logger
winston.add(winston.transports.DailyRotateFile, {
  filename: './log/server.log',
  datePattern: '.yyyy-MM-dd_HH-mm',
  level: config.get('level'),
  json: false,
});
winston.debug('Using config: %s', config.get('cfg'));

var app = express();
var server = http.createServer(app);

// Configure express
require('../config/express')(app);

// Add error routes
require('./routes/error.js')(app);

var onError = function onError(error) {
  winston.error(error);
  process.exit(1);
};

var onListening = function onListening() {
  winston.info(`Server started on port ${config.get('port')}!`);
};

server.listen(config.get('port'), config.get('host'));
server.on('error', onError);
server.on('listening', onListening);
module.exports = server;
