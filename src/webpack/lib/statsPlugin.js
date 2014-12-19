var fs = require('fs');
var path = require('path');

module.exports = function(options) {
  return function() {
    if (options.prerender) return;
    this.plugin('done', function(stats) {
      var statsPath = path.join(__dirname, '..', '..', 'build', 'stats.json');
      fs.writeFileSync(statsPath, JSON.stringify(stats.toJson({
        chunkModules: true,
        exclude: [(/node_modules[\\\/]react/)]
      })));
    });
  };
};