'use strict';

require('colors');
var util = require('util');

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

Logger.prototype.info = function(msg) {
  var template = this.useColors ? '%s'.cyan : '%s';
  this.log_(util.format(template, msg), Logger.LogLevel.INFO);
};

Logger.prototype.debug = function(msg) {
  var template = this.useColors ? '%s'.yellow : '%s';
  this.log_(util.format(template, msg), Logger.LogLevel.DEBUG);
};

Logger.prototype.isLoggable = function(level) {
  return this.logLevel >= level;
};

module.exports = Logger;
