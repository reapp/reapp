var pack = require('reapp-pack');
require('reapp-object-assign');

module.exports = function(opts) {
  var config;
  var defaults = {
    entry: require(opts.dir + '/package.json')["main"]
  };

  var configName = opts.name + (
    opts.platform === 'web' ?
      '' :
      '.' + opts.platform
    ) + '.config.js';

  if (opts.debug)
    console.log('Looking for config file: %s'.blue, configName);

  try {
    config = require(opts.dir + '/config/' + configName);
  }
  catch(e) {
    try {
      config = require(opts.dir + '/' + configName)
    } catch(e) {
      config = getDefaultConfig(opts);
    }
  }

  // global config
  var globalConfig;

  try {
    globalConfig = require(opts.dir + '/config/all.config.js');
  }
  catch(e) {
    try {
      globalConfig = require(opts.dir + '/all.config.js');
    }
    catch(e) {}
  }

  if (globalConfig) {
    config = Object.assign({}, globalConfig, config);
  }

  return pack(
    Object.assign(defaults, config, opts)
  );
}

function getDefaultConfig(opts) {
  var defaultConfigPath = 'reapp-pack/config/'+opts.name+'.js';

  if (opts.debug) {
    console.log('No user config found...'.blue);
    console.log('Looking for default config: ', defaultConfigPath);
    console.log(e, "\n");
  }

  return require(defaultConfigPath);
}