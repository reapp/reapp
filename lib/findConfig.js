module.exports = function(opts) {
  var config;
  try {
    var userConfig = opts.dir + (
      '/config/' +
      opts.name +
      (opts.platform ? '.' + opts.platform : '') +
      '.config.js'
    );

    if (opts.debug)
      console.log('Looking for config file:'.blue, userConfig);

    config = require(userConfig);
  }
  catch(e) {
    if (opts.debug) {
      console.log('No user config found...'.blue);
      console.log(e);
      console.log();
    }

    var makeConfig = require('reapp-pack/config/'+opts.name+'.js');
    config = makeConfig(opts);
  }

  return config;
}