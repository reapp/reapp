var mkdirp = require('mkdirp');
var rimraf = require('rimraf');

module.exports = function(dir, cb) {
  rimraf(dir, createDir);

  function createDir() {
    mkdirp(dir, cb || function() {});
  }
}