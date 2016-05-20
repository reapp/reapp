var ncp = require('ncp');
var dir = process.cwd();

module.exports = function(from, to, cb) {
  console.log(
    'Copying',
    from.replace(dir, '.'),
    'to',
    to.replace(dir, '.'),
    '...'
  );

  ncp.limit = 1000000;

  ncp(from, to, cb);
};