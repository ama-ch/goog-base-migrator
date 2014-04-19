'use strict';

var fs = require('fs');

function migrator() {
//  return src;
  return fs.readFileSync('test/fixture/basic-fixed.js', 'utf8');
}

module.exports = migrator;