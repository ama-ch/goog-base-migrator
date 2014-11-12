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

  context('multiline', function() {
    it('migrate multiline goog.base to static base method.', function() {
      var src = fs.readFileSync('test/fixture/multiline.js', 'utf8');
      var actual = migrator.migrate(src);
      var expected = fs.readFileSync('test/fixture/multiline-fixed.js', 'utf8');
      assert.equal(actual, expected);
    });
  });

  context('goog.scope', function() {
    it('migrate goog.scoped goog.base to static base method.', function() {
      var src = fs.readFileSync('test/fixture/goog-scope.js', 'utf8');
      var actual = migrator.migrate(src);
      var expected = fs.readFileSync('test/fixture/goog-scope-fixed.js', 'utf8');
      assert.equal(actual, expected);
    });
  });

  context('assignment', function() {
    it('migrate assigning goog.base to static base method.', function() {
      var src = fs.readFileSync('test/fixture/assignment.js', 'utf8');
      var actual = migrator.migrate(src);
      var expected = fs.readFileSync('test/fixture/assignment-fixed.js', 'utf8');
      assert.equal(actual, expected);
    });
  });

  context('commented params', function() {
    it('migrate commented params to static base method.', function() {
      var src = fs.readFileSync('test/fixture/commented.js', 'utf8');
      var actual = migrator.migrate(src);
      var expected = fs.readFileSync('test/fixture/commented-fixed.js', 'utf8');
      assert.equal(actual, expected);
    });
  });
});
