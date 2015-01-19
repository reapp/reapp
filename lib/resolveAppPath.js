module.exports = function(dir, config) {
  if (config && config.indexOf('./') === 0)
    return opts.dir + config.slice(1);
  else
    return config;
}