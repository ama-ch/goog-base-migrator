'use strict';

var assert = require("power-assert");
var fs = require("fs");
var migrator = require('../lib/goog-base-migrator.js');

describe('migrator', function() {
  context('basic', function() {
    it('migrate from goog.base to static base method.', function() {
      var src = fs.readFileSync('test/fixture/basic.js', 'utf8');
      var actual = migrator(src);
      var expected = fs.readFileSync('test/fixture/basic-fixed.js', 'utf8');
      assert.equal(actual, expected);
    });
  });
});
