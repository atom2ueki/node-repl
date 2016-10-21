'use strict'

var repl = require('repl');

var replServer = repl.start({
  prompt: '🤖 Jeeves >>> ',
});

var config = require("/Users/atom2ueki/Documents/atom2ueki/Jeeves-REPL/config.js");
replServer.context.config = config;

var abc = require("/Users/atom2ueki/Documents/atom2ueki/Jeeves-REPL/abc.js");
replServer.context.abc = abc;
