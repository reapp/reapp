module.exports = function loadersByExtension(obj) {
  var loaders = [];
  var extensions = Object.keys(obj).map(function(key) {
    return key.split("|");
  }).reduce(function(arr, a) {
    arr.push.apply(arr, a);
    return arr;
  }, []);
  Object.keys(obj).forEach(function(key) {
    var exts = key.split("|");
    var value = obj[key];
    if(Array.isArray(value)) {
      loaders.push({
        extensions: exts,
        test: extsToRegExp(exts),
        loaders: value
      });
    } else {
      loaders.push({
        extensions: exts,
        test: extsToRegExp(exts),
        loader: value
      });
    }
  });
  return loaders;
};

function extsToRegExp(exts) {
  return new RegExp("\\.(" + exts.map(function(ext) {
    return ext.replace(/\./g, "\\.") + "(\\?.*)?";
  }).join("|") + ")$");
}