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
    var packConfig = 'reapp-pack/config/'+opts.name+'.js';

    if (opts.debug) {
      console.log('No user config found...'.blue);
      console.log(e);
      console.log();

      console.log('looking for default config: ', packConfig);
    }

    var makeConfig = require(packConfig);
    config = makeConfig(opts);
  }

  return config;
}