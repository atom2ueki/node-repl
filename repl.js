/*!
 * repl.js
 * Licensed under the MIT license
 *
 * Copyright (c) 2016 Tony Li
 */
"use strict"

var repl = require('repl');
var util = require('util');
var exec = require('child_process').exec;
var exit_cmd = '.exit';

var replServer = repl.start({
  prompt: '🤖 Jeeves >>> ',
});

var abc = require("/Users/atom2ueki/Documents/atom2ueki/sandbox/abc.js");
replServer.context.abc = abc;

var test = require("/Users/atom2ueki/Documents/atom2ueki/sandbox/test.js");
replServer.context.test = test;

var config = require("/Users/atom2ueki/Documents/atom2ueki/sandbox/app/config.js");
replServer.context.config = config;