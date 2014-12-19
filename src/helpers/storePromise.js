var { Promise } = require('bluebird');

module.exports = function(store, conditional) {
  return new Promise((res, rej) => {
    var unlisten = store.listen(data => {
      if (conditional(data)) {
        unlisten();
        res(data);
      }
    });
  });
};