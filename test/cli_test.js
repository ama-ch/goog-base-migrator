'use strict';

var assert = require("power-assert");
var cli = require('../lib/cli');
var fs = require('fs');
var Logger = require('../lib/logger');
var sinon = require('sinon');

describe('cli', function() {
  var argv, mockStdout;
  var info, debug;

  beforeEach(function() {
    this.sinon = sinon.sandbox.create();
    info = this.sinon.spy(Logger.prototype, 'info');
    debug = this.sinon.spy(Logger.prototype, 'debug');
    this.sinon.stub(fs, 'writeFileSync');
    argv = ['node', 'bin/index.js', 'test/fixture/basic.js'];
    mockStdout = {write: this.sinon.spy()};
  });

  afterEach(function() {
    this.sinon.restore();
  });

  it('find all expressions.', function() {
    cli(argv, mockStdout);
    assert.equal(info.args[0][0], 'Found 4 expressions.');
  });

  it('fix in place all expressions.', function() {
    argv.push('--fix-in-place');
    cli(argv, mockStdout);
    assert.equal(info.args[0][0], 'Fixed 4 expressions.');
  });

  it('show debug message.', function() {
    argv.push('--debug');
    console.log(argv);
    cli(argv, mockStdout);
    assert.equal(info.args[0][0], 'Found 4 expressions.');
  });
});
