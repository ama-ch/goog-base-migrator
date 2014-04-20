#!/usr/bin/env node

var cli = require("../lib/cli");
var exitCode = cli(process.argv, process.stdout, process.stderr);
process.exit(exitCode);
