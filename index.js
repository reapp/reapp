var Reapp = require('./src/reapp');
var Run = require('./src/run');

module.exports = {
  run(routes) {
    Run(routes);
    return Reapp;
  }
};