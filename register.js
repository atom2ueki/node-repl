/*!
 * register.js
 * Licensed under the MIT license
 *
 * Copyright (c) 2016 Tony Li
 */
"use strict"

const path = require('path');
const readline = require('readline');
const fs = require('fs');

function contains(arr, x) {
  if (arr == null) {
    return false
  }else {
    return arr.indexOf(x) >= 0 ? true : false
  }
}

function register(file_path, func_name, file_name) {
	var current_array = [];

	const rl = readline.createInterface({
	  input: fs.createReadStream('./repl.js'),
	  terminal: false
	});

	rl.on('line', function (line) {
	  if (line.trim() != "") {
	  	var match = line.trim().match(/("(.*?)")/);
	  	if (match) {
	  		current_array.push(String(match[1]).match(/"(.*?)"/)[1]);
	  	}
	  }
	}).on('close', () => {
		var checker = String(path.join(file_path, file_name));
		if (!contains(current_array, checker)) {
			fs.appendFile('./repl.js', '\nvar '+func_name+ ' = require("'+ path.join(file_path, file_name) +'");\nreplServer.context.'+func_name+' = '+func_name+';\n', function (err) {
				console.log(err);
			});
		}
	});
}

function filterByJSFormat(obj) {
  if (obj.split('.').pop() === 'js'){
  	return true
  } else {
  	return false
  }
}

function filterJs(files) {
	return files.filter(filterByJSFormat);
}

function ignorePathArray(ignore_array) {
	return ignore_array.map(function(ignore_file) {
		return path.join(__dirname, ignore_file);
	})
}

function default_export(file_path, file_ignore) {
	var files_array = fs.readdirSync(file_path);
	var filtered_ignore_list = files_array.filter(x => file_ignore.indexOf(x) == -1);
	var filtered_js_list = filterJs(filtered_ignore_list);
	filtered_js_list.map(file_name => register(file_path, file_name.split('.')[0], file_name));

	files_array.forEach(file => {
		var sub_file_path = path.join(file_path,file);
		// check wheater this path inside ignore list or not
		var stat = fs.lstatSync(sub_file_path);
		if (stat.isDirectory() && !contains(ignorePathArray(file_ignore), sub_file_path)) {
			default_export(sub_file_path, file_ignore);
		}
	})
}

module.exports = default_export;





