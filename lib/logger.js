'use strict';

var colors = require('colors');
var util = require('util');

var Logger = function(stdout, stderr) {
  this.stdout = stdout;
  this.stderr = stderr;
  this.useColors = true;
};

Logger.prototype.log = function(msg) {
  this.stdout.write(msg + '\n');
};

module.exports = Logger;
