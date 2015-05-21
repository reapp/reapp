var fs = require('fs')
var pack = require('reapp-pack');
require('reapp-object-assign');

function moduleExists(path) {
  try {
    require.resolve(path);
    return true;
  } catch (e) {
    return false;
  }
}

function requireFirst(paths, getDefault) {
  if (typeof getDefault === 'undefined') {
    getDefault = function() { return null; };
  }
  if (paths.length === 0) {
    return getDefault();
  }

  // Try to resolve all alternatives except the last one
  var path, i;
  for (i = 0; i < paths.length; i++) {
    path = paths[i];
    if (moduleExists(path)) {
      return require(path);
    }
  }
  return getDefault();
}

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

  config = requireFirst([
    opts.dir + '/config/' + configName,
    opts.dir + '/' + configName
  ], function() {
    return getDefaultConfig(opts);
  });

  // global config
  var globalConfig;

  globalConfig = requireFirst([
    opts.dir + '/config/all.config.js',
    opts.dir + '/all.config.js'
  ], function() {
    return null;
  });

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
  }

  return require(defaultConfigPath);
}
