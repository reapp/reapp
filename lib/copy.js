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

  ncp(from, to, cb);
};