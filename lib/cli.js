'use strict';

var Logger = require('./logger');
var fs = require('fs');
var Migrator = require('./goog-base-migrator');
var program = require('commander');

function cli(argv, stdout, stderr) {
  program
    .option('-f, --fix-in-place', 'Fix the file in-place.')
    .option('-d, --debug', 'Show debugging log.')
    .parse(argv);

  var logLevel = program.debug ?
    Logger.LogLevel.DEBUG : Logger.LogLevel.INFO;
  var logger = new Logger(stdout, stderr, logLevel);
  program.args.forEach(function(file) {
    logger.log('File: ' + file);
    var src = fs.readFileSync(file, 'utf8');
    var migrator = new Migrator(logger);
    var result = migrator.migrate(src);
    logger.info('Found ' + migrator.found + ' expressions.');
    if (program.fixInPlace) {
      fs.writeFileSync(file, result, 'utf8');
    }
  });

  return 0;
}

module.exports = cli;
