// assumes profileDirectiveDigest(selector)
// use: findExpensiveDigest(selector1, selector2, ...);

/* global profileDirectiveDigest */
(function (window) {

  function findExpensiveDigest() {
    if (typeof profileDirectiveDigest !== 'function') {
      throw new Error('cannot find profileDirectiveDigest function');
    }
    var selectors = Array.prototype.slice.call(arguments, 0);
    var durations = selectors.map(function timeSelectorDigest(selector) {
      /* global performance */
      var started = performance.now();
      profileDirectiveDigest(selector);
      var takes = performance.now() - started;
      return takes;
    });
    var merged = selectors.map(function (selector, k) {
      return {
        selector: selector,
        takes: durations[k]
      };
    });
    merged = merged.sort(function (a, b) {
      return b.takes - a.takes;
    });
    console.log('elements with expensive digest cycles');
    console.table(merged);
  }

  window.findExpensiveDigest = findExpensiveDigest;
}(window));
