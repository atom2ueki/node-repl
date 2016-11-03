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

function register(repl_file, file_path, func_name, file_name) {
	fs.appendFile(repl_file, '\nvar '+func_name+ ' = require("'+ path.join(file_path, file_name) +'");\nreplServer.context.'+func_name+' = '+func_name+';\n', function (err) {
				if (err) throw err;
			});
}

/***
*	clean up the existing
**/
function cleanup(bool, repl_file, cb) {
	if (bool) {
		fs.closeSync(fs.openSync(path.join(__dirname, repl_file), 'w'));
		fs.appendFile(repl_file, "'use strict'\n\nvar repl = require('repl');\n\nvar replServer = repl.start({\n  prompt: '🤖 Jeeves >>> ',\n});\n", function (err) {
			if (err) throw err;
			cb();
		})
	} else {
		cb()
	}
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

function ignorePathArray(ignorePathArray, ignore_array) {
	return ignore_array.map(function(ignore_file) {
		return path.join(ignorePathArray, ignore_file);
	})
}

function default_export(file_path, file_name, file_ignore, bool) {
	var files_array = fs.readdirSync(file_path);
	var filtered_ignore_list = files_array.filter(x => file_ignore.indexOf(x) == -1);
	var filtered_js_list = filterJs(filtered_ignore_list);
	
	var repl_file_with_path = path.join(__dirname, file_name);

	// clean and re-register the new files added
	cleanup(bool, file_name, ()=> filtered_js_list.map(map_file_name => register(repl_file_with_path, file_path, map_file_name.split('.')[0], map_file_name)));

	files_array.forEach(file => {
		var sub_file_path = path.join(file_path,file);
		// check wheater this path inside ignore list or not
		var stat = fs.lstatSync(sub_file_path);
		if (stat.isDirectory() && !contains(ignorePathArray(__dirname, file_ignore), sub_file_path)) {
			default_export(sub_file_path, file_name, file_ignore, false);
		}
	})
}

module.exports = default_export;





