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
  if (typeof version === 'boolean')
    version = 0.6;

  var majorVersion = getMajorVersion(version);

  if (majorVersion < MAJOR_VERSION) {
    wrongVersionMessage();
    upgadeMessage(majorVersion, MAJOR_VERSION);
  }

  function wrongVersionMessage() {
    console.log("You're running a reapp "+ version +" app with reapp "+ VERSION);
  }
}

function upgadeMessage(user, cur) {

}

function notReapp() {
  console.error('No reapp application found, ensure reapp: "true" is set in package.json.');
  error();
}

function getMajorVersion(version) {
  version = parseFloat(version);
  return Math.round(version * (version < 1.0 ? 10 : 0);
}

function error(e) {
  if (e)
    console.log(e);
  process.exit(1);
}