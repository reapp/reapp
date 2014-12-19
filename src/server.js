/* --dev --port [#] --config [path] --wport [#] --quiet --colors --progress --hot */

var express = require('express');
var path = require('path');
var yargs = require('yargs').argv;
var fs = require('fs');
var os = require('os');
var util = require('util');
var Router = require('react-router');
var Cors = require('cors');
var webpack = require('webpack');
var webpackConfig = require(path.join(
    __dirname, '/webpack/', (yargs.config || 'config.production.js')));

var app = express();
var port = Number(yargs.port || process.env.PORT || 5283);
app.set('port', port);

console.log('Starting', yargs.dev ? 'dev' : 'prod' , 'server...');

app.use(Cors());

var staticPaths = [
  '/build/public',
  '/assets',
  '/web_modules',
  '/node_modules/reapp-ui/assets'
];

staticPaths.forEach(function(path) {
  app.use('/assets', express.static(__dirname + path));
});

if (yargs.dev)
  runDevelopmentServer();
else
  runProductionServer();

function runDevelopmentServer() {
  var webpackServer = require('./webpack/server');
  var hostname = 'localhost';
  // hostname = os.hostname();
  yargs.hostname = hostname;

  webpackServer.run(webpackConfig, yargs, function(template) {
    app.get('*', function(req, res) {
      res.send(template);
    });
    runServer();
  });
}

function runProductionServer() {
  var config = webpackConfig[1];
  debug('Webpack Config', "\n", config);

  webpack(webpackConfig, function(err) {
    if (err) console.warn(err, stats);
    else {
      var outputPath = config.output.path;
      var app = require(outputPath + '/main.js');
      var stats = require(outputPath + '/../stats.json');
      var STYLE_URL = 'main.css?' + stats.hash;
      var SCRIPT_URL = [].concat(stats.assetsByChunkName.main)[0] + '?' + stats.hash;

      app.get('/*', function(req) {
        return renderProductionApp(app, req.path, STYLE_URL, SCRIPT_URL);
      });

      runServer();
    }
  });
}

function runServer() {
  console.log('Server running on', port);
  app.listen(app.get('port'));
}

function renderProductionApp(app, path, styleUrl, scriptUrl) {
  return new Promise(function(resolve, reject) {
    Router.renderRoutesToString(app, path, function(err, ar, html, data) {
      console.log(path, ar);
      if (ar) {
        reject({ redirect: true, to: '/' + ar.to + '/' + ar.params.id,  }); // todo finish
      }

      var HTML = fs.readFileSync(__dirname + '/app/assets/index.html').toString();
      var output = HTML
        .replace('<!-- CONTENT -->', html)
        .replace('<!-- DATA -->', '<script>window.ROUTER_PROPS = ' + JSON.stringify(data) + ';</script>')
        .replace('<!-- STYLES -->', '<link rel="stylesheet" type="text/css" href="/' + styleUrl + '" />')
        .replace('<!-- SCRIPTS -->', '<script src="/' + scriptUrl + '"></script>');

      resolve(output);
    });
  });
}

var util;
function debug() {
  if (yargs.debug) {
    util = util || require('util');
    console.log(
      util.inspect(Array.prototype.slice.call(arguments, 0), true, 4));
  }
}