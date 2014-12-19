module.exports = function joinEntry(current) {
  var args = Array.prototype.slice.call(arguments, 1);
  if(typeof current === "string") {
    current = [current];
  }
  args.forEach(function(arg) {
    if(typeof arg === "string")
      arg = [arg];
    if(Array.isArray(current)) {
      if(Array.isArray(arg)) {
        current = current.concat(arg);
      } else {
        var newCurrent = {};
        Object.keys(arg).forEach(function(key) {
          newCurrent[key] = joinEntry(current, arg[key]);
        });
        current = newCurrent;
      }
    } else {
      if(Array.isArray(arg)) {
        var newCurrent = {};
        Object.keys(current).forEach(function(key) {
          newCurrent[key] = joinEntry(current[key], arg);
        });
        current = newCurrent;
      } else {
        var newCurrent = {};
        Object.keys(current).concat(Object.keys(arg)).forEach(function(key) {
          if(current[key] && arg[key])
            newCurrent[key] = joinEntry(current[key], arg[key]);
          else if(current[key])
            newCurrent[key] = current[key];
          else
            newCurrent[key] = arg[key];
        });
        current = newCurrent;
      }
    }
  });
  return current;
};