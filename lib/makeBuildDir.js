var mkdirp = require('mkdirp');
var rimraf = require('rimraf');

module.exports = function(dir, cb) {
  var buildDir = dir + '/build/public';

  rimraf(buildDir, createDir);

  function createDir() {
    mkdirp(buildDir, cb || function() {});
  }
}