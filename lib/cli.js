'use strict';

var fs = require('fs');
var migrator = require('./goog-base-migrator');
var program = require('commander');

function cli(argv) {
  program
    .option('-f, --fix-in-place', 'Fix the file in-place.')
    .parse(argv);

  program.args.forEach(function(file) {
    var src = fs.readFileSync(file, 'utf8');
    var result = migrator(src);
    if (program.fixInPlace) {
      fs.writeFileSync(file, result, 'utf8');
    }
  });

  return 0;
}

module.exports = cli;
