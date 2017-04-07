'use strict'

var repl = require('repl');

var replServer = repl.start({
  prompt: '🤖 Jeeves >>> ',
});

var config = require("/Users/atom2ueki/Documents/atom2ueki/node-repl/app/config.js");
replServer.context.config = config;

var tony = require("/Users/atom2ueki/Documents/atom2ueki/node-repl/app/tony.js");
replServer.context.tony = tony;

var abc = require("/Users/atom2ueki/Documents/atom2ueki/node-repl/abc.js");
replServer.context.abc = abc;
