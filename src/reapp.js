require('reapp-object-assign');

// exports to window
if (Env.CLIENT) {
  if (Env.PRODUCTION)
    require('reapp-raf-batching');
}

module.exports = {
  run: require('./run'),
  env: require('./env'),
  helpers: require('./helpers/helpers'),
  mixins: require('./mixins/mixins'),
  server: require('./server'),
  webpack: require('./webpack/server')
};