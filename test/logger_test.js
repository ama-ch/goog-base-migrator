'use strict';

var assert = require("power-assert");
var Logger = require('../lib/logger');
var sinon = require('sinon');

describe('Logger', function() {
  var logger, mockStdout;

  beforeEach(function() {
    this.sinon = sinon.sandbox.create();
    mockStdout = {write: this.sinon.spy()};
    logger = new Logger(mockStdout, {});
  });

  afterEach(function() {
    this.sinon.restore();
  });

  describe('#log', function() {
    it('show message to stdout.', function() {
      logger.log('message');
      assert.equal(mockStdout.write.args[0][0], 'message\n');
    });
  });

  describe('#info', function() {
    it('show colored message to stdout.', function() {
      logger.info('message');
      assert.equal(mockStdout.write.args[0][0], '\x1B[36mmessage\x1B[39m\n');
    });
  });

  describe('#debug', function() {
    it('show colored message to stdout.', function() {
      logger.logLevel = Logger.LogLevel.DEBUG;
      logger.debug('message');
      assert.equal(mockStdout.write.args[0][0], '\x1B[33mmessage\x1B[39m\n');
    });
  });
});
