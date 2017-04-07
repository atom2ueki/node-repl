"use strict"

const fs = require('fs');
const path = require('path');
const should = require('should');
var repl = require('../src/index');
var project_root_path = __dirname

function fileContains(file_path, file_name, content, cb) {
	fs.readFile(path.join(file_path, file_name), 'utf8', function(err, cont) {
    if (err) {
    	throw err;
    	cb(err, null)
    }else {
    	cb(err, cont.indexOf(content) > -1)
    }
	})
}

describe('😎 start testing >>>', function() {

	describe('basic functional testing >>>', function() {
		before(function(){
			repl.run(project_root_path)
		})

  	it('she.js should excluded from repl.js, issue from ignore folder', function(done) {
      fileContains(project_root_path, 'repl.js', 'she.js', function(err, res) {
      	if (err) return done(err)
      	res.should.equal(false)
      	done()
      })
    })

    it('am.js should excluded from repl.js, issue from ignore folder', function(done) {
      fileContains(project_root_path, 'repl.js', 'am.js', function(err, res) {
      	if (err) return done(err)
      	res.should.equal(false)
      	done()
      })
    })

    it('he.js should excluded from repl.js, issue from ignore folder', function(done) {
      fileContains(project_root_path, 'repl.js', 'he.js', function(err, res) {
      	if (err) return done(err)
      	res.should.equal(false)
      	done()
      })
    })

    it('sub.js should excluded from repl.js, issue from sub ignore folder', function(done) {
      fileContains(project_root_path, 'repl.js', 'sub.js', function(err, res) {
      	if (err) return done(err)
      	res.should.equal(false)
      	done()
      })
    })

    it('a.js should included from repl.js, issue from non-folder js file', function(done) {
      fileContains(project_root_path, 'repl.js', 'a.js', function(err, res) {
      	if (err) return done(err)
      	res.should.equal(true)
      	done()
      })
    })

    it('b.js should included from repl.js, issue from non-folder js file', function(done) {
      fileContains(project_root_path, 'repl.js', 'b.js', function(err, res) {
      	if (err) return done(err)
      	res.should.equal(true)
      	done()
      })
    })
  })
})