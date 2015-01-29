module.exports = function(dir) {
  try {
    var package = require(dir + '/package.json');

    if (!package.reapp)
      error();
  }
  catch (e) {
    error(e);
  }
}

function error(e) {
  console.error('No reapp application found, ensure reapp: "true" is set in package.json.');
  console.log(e);
  process.exit(1);
}