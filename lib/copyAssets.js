var copy = require('./copy');
var write = require('fs').writeFile;

// copy assets

module.exports = function(platform, from, to, layout) {
  var assetsDir = from + '/assets/';
  var platformDir = assetsDir + platform;
  var sharedDir = assetsDir + 'shared/';

  copy(sharedDir, to, function() {
    copy(platformDir, to, function() {
      layout && write(to + '/index.html', layout);
    });
  });
}