var mkdirp = require('mkdirp');

module.exports = function(dir, cb) {
  mkdirp(dir, cb || function() {});
}