var pack = require('reapp-pack');
require('reapp-object-assign');

module.exports = function(opts) {
  var config;
  var userConfig = opts.dir + ('/config/' + opts.name +
    (opts.platform === 'web' ? '' : '.' + opts.platform) + '.config.js' );
  if (opts.debug)
    console.log('Looking for config file: %s'.blue, userConfig);

  try {
    config = require(userConfig);
  }
  catch(e) {
    var defaultConfigPath = 'reapp-pack/config/'+opts.name+'.js';

    if (opts.debug) {
      console.log('No user config found...'.blue);
      console.log('Looking for default config: ', defaultConfigPath);
      console.log(e, "\n");
    }

    config = require(defaultConfigPath);
  }

  // global config
  try {
    var globalConfig = require(opts.dir + '/config/all.config.js');
    config = Object.assign({}, globalConfig, config);
  }
  catch(e) {}

  return pack(Object.assign(config, opts));
}