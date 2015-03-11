var copy = require('./copy');
var write = require('fs').writeFile;
var rimraf = require('rimraf');

// copy assets

module.exports = function(platform, from, to, layout, cb) {
  var assetsDir = from + '/assets/';
  var platformDir = assetsDir + platform;
  var sharedDir = assetsDir + 'shared/';

  copy(sharedDir, to, function() {
    copy(platformDir, to, function() {
      if (layout) {
        var layoutOut = to + '/index.html';

        console.log(
          'Writing layout: ',
          layoutOut.replace(process.cwd(), '.')
        );

        // settimoue because ncp is buggy
        setTimeout(function() {
          rimraf(layoutOut, function() {
            write(layoutOut, layout, cb);
          });
        });
      }
    });
  });
}