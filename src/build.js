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

/* scan .replignore */
function setup(cb) {
	var ignore_array = [];
	const reader = readline.createInterface({
	  input: fs.createReadStream(path.join(__dirname, '../.replignore')),
	  terminal: false
	});
	reader.on('line', function (line) {
	  if (line.trim().match(/^#.*$/) == null && line.trim() != "") {
	  	ignore_array.push(path.join(__dirname, "../"+line.trim()));
	  }
	}).on('close', () => cb(ignore_array));
}

setup(function(file_ignore){
	// console.log(file_ignore)
	register('repl.js', process.cwd(), file_ignore, true);
	// register('repl.js', __dirname, file_ignore, true);
})