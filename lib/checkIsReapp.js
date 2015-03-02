require('colors');

var VERSION = require('../package.json').version;
var MAJOR_VERSION = getMajorVersion(VERSION);

module.exports = function(dir) {
  try {
    var package = require(dir + '/package.json');

    if (!package.reapp)
      notReapp();

    checkReappVersion(package.reapp);
  }
  catch (e) {
    error(e);
  }
}

function checkReappVersion(version) {
  if (isNaN(parseFloat(version)))
    version = 0.6;

  var majorVersion = getMajorVersion(version);

  if (majorVersion < MAJOR_VERSION) {
    wrongVersionMessage();
    upgadeMessage(majorVersion, MAJOR_VERSION);
    process.exit(1);
  }

  function wrongVersionMessage() {
    console.log("You're running a reapp@%s app with reapp@%s\n".red.bold, version, VERSION);
  }
}

function notReapp() {
  console.error('No reapp application found, ensure reapp: "'+ MAJOR_VERSION +'" is set in package.json.');
  error();
}

function getMajorVersion(version) {
  version = parseFloat(version);
  var modifier = version < 1.0 ? 10 : 0;
  return Math.round(version * modifier) / modifier;
}

function error(e) {
  if (e)
    console.log(e);
  process.exit(1);
}

function upgadeMessage(user, cur) {
  console.log("Steps to upgrade:".bold);
  console.log('- Read upgrade instructions:');
  console.log('  https://github.com/reapp/reapp/blob/master/UPGRADE.md', "\n");
  console.log('Once you\'ve made those changes, set "reapp": "%s" in your package.json', MAJOR_VERSION, "\n");
}