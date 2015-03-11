var mkdirp = require('mkdirp');
var rimraf = require('rimraf');

module.exports = function(config, platform, cb) {
  var dir = config.output.path;

  if (config.debug)
    console.log('Recreate build dir:', dir);

  rimraf(dir, createDir);

  function createDir() {
    mkdirp(dir, cb || function() {});
  }

  return dir;
}