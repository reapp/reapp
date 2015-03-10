var ncp = require('ncp');

module.exports = function(from, to, cb) {
  console.log('Copying ', from, 'to', to, '...');
  ncp(from, to, cb);
};