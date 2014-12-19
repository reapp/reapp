var fs = require('fs');
var WebpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');

module.exports = {

  run: function(config, opts, callback) {
    var hostname = opts.hostname || 'localhost';
    var port = Number(opts.wport || process.env.WEBPACKPORT || 5284);
    var base = 'http://' + hostname + ':' + port + '/';

    config.output.publicPath = base;

    var webpackServer = new WebpackDevServer(
      webpack(config),
      {
        contentBase: '../',
        quiet: !!opts.quiet,
        hot: !!opts.hot,
        progress: !!opts.progress,
        stats: {
          colors: !!opts.colors,
          timings: true
        }
      }
    );

    console.log('Webpack server running on', port);
    webpackServer.listen(port, hostname);

    var entries = [
      // 'vendor',
      'main',
      'webpack-dev-server'
    ];

    var scripts = entries.map(function(key) {
      return '<script src="' + base + key + '.js"></script>';
    });

    var template = fs
      .readFileSync(__dirname + '/../assets/index.html')
      .toString()
      .replace('<!-- SCRIPTS -->', scripts.join("\n"));

    callback.call(this, template);
  }

};