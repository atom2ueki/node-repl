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
function setup(root_path, cb) {
	var ignore_array = [];
	const reader = readline.createInterface({
	  input: fs.createReadStream(path.join(root_path,'.replignore')),
	  terminal: false
	});
	reader.on('line', function (line) {
	  if (line.trim().match(/^#.*$/) == null) {
	  	ignore_array.push(line.trim());
	  }
	}).on('close', () => cb(ignore_array));
}

exports.run = function(root_path) {
  setup(root_path, function(file_ignore){
		register(root_path, root_path, 'repl.js', file_ignore, true);
	})
};