'use strict';

var assert = require("power-assert");
var fs = require("fs");
var Logger = require('../lib/logger');
var Migrator = require('../lib/goog-base-migrator.js');

describe('migrator', function() {
  var migrator;

  beforeEach(function() {
    var logger = new Logger(process.stdout, process.stderr);
    migrator = new Migrator(logger);
  });

  context('basic', function() {
    it('migrate from goog.base to static base method.', function() {
      var src = fs.readFileSync('test/fixture/basic.js', 'utf8');
      var actual = migrator.migrate(src);
      var expected = fs.readFileSync('test/fixture/basic-fixed.js', 'utf8');
      assert.equal(actual, expected);
    });
  });
});
