'use strict';

var Logger = require('./logger');
var fs = require('fs');
var Migrator = require('./goog-base-migrator');
var program = require('commander');

function buildOptions(argv) {
  program
    .option('-f, --fix-in-place', 'Fix the file in-place.')
    .option('-d, --debug', 'Show debugging log.')
    .parse(argv);
}

function createLogger(stdout, stderr, debug) {
  var logLevel = debug ? Logger.LogLevel.DEBUG : Logger.LogLevel.INFO;
  return new Logger(stdout, stderr, logLevel);
}

function processFile(file, logger, fixInPlace) {
  var src = fs.readFileSync(file, 'utf8');
  var migrator = new Migrator(logger);
  var result = migrator.migrate(src);
  if (fixInPlace) {
    fs.writeFileSync(file, result, 'utf8');
  }
  return migrator.found;
}

function cli(argv, stdout, stderr) {
  buildOptions(argv);
  var totalFound = 0;
  var logger = createLogger(stdout, stderr, program.debug);
  program.args.forEach(function(file) {
    logger.log('File: ' + file);
    totalFound += processFile(file, logger, program.fixInPlace);
  });
  var action = program.fixInPlace ? 'Fixed ' : 'Found ';
  logger.info(action + totalFound + ' expressions.');
  return 0;
}

module.exports = cli;
