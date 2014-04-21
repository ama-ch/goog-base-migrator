'use strict';

var clc = require('cli-color');

var Logger = function(stdout, stderr, opt_logLevel) {
  this.stdout = stdout;
  this.stderr = stderr;
  this.useColors = true;
  this.logLevel = opt_logLevel ?
    opt_logLevel : Logger.LogLevel.INFO;
};

Logger.LogLevel = {
  INFO: 0,
  DEBUG: 1
};

Logger.prototype.log = function(msg) {
  this.stdout.write(msg + '\n');
};

Logger.prototype.log_ = function(msg, logLevel) {
  if (this.isLoggable(logLevel)) {
    this.stdout.write(msg + '\n');
  }
};

Logger.prototype.getColoredMessage = function(msg, color) {
  return this.useColors ? color(msg) : msg;
};

Logger.prototype.info = function(msg) {
  this.log_(this.getColoredMessage(msg, clc.cyan), Logger.LogLevel.INFO);
};

Logger.prototype.debug = function(msg) {
  this.log_(this.getColoredMessage(msg, clc.yellow), Logger.LogLevel.DEBUG);
};

Logger.prototype.isLoggable = function(level) {
  return this.logLevel >= level;
};

module.exports = Logger;
