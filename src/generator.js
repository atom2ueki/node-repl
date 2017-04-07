/*!
 * build.js
 * Licensed under the MIT license
 *
 * Copyright (c) 2016 Tony Li
 */
"use strict"

const register = require('./register');
const path = require('path');
const readline = require('readline');
const fs = require('fs');
const root_dir = process.cwd()

/* scan .replignore */
function setup(cb) {
	var ignore_array = [];
	const reader = readline.createInterface({
	  input: fs.createReadStream('./.replignore'),
	  terminal: false
	});
	reader.on('line', function (line) {
	  if (line.trim().match(/^#.*$/) == null) {
	  	ignore_array.push(line.trim());
	  }
	}).on('close', () => cb(ignore_array));
}

setup(function(file_ignore){
	register(root_dir, 'repl.js', file_ignore, true);
})