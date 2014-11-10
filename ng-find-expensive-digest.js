// assumes profileDirectiveDigest(selector)
// use: findExpensiveDigest(selector1, selector2, ...);
function findExpensiveDigest() {
  if (typeof findExpensiveDigest !== 'function') {
    throw new Error('cannot find findExpensiveDigest function');
  }
  var selectors = Array.prototype.slice.call(arguments, 0);
  var durations = selectors.map(function timeSelectorDigest(selector) {
    var started = performance.now();
    profileDirectiveDigest(selector);
    var takes = performance.now() - started;
    return takes;
  });
  var merged = selectors.map(function (selector, k) {
    return { selector: selector, takes: durations[k] };
  });
  merged = merged.sort(function (a, b) {
    return b.takes - a.takes;
  });
  console.log('elements with expensive digest cycles');
  console.table(merged);
}
