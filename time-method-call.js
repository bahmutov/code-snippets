(function profileMethodCall() {
  var object = primesApp;
  var methodName = 'findFirstPrimes';
  var originalMethod = object[methodName];
  console.assert(typeof originalMethod === 'function', 'cannot find method ' + methodName);
  object[methodName] = function () {
    console.time(methodName);
    originalMethod.call(object);
    console.timeEnd(methodName);
    // restore original methodName
    object[methodName] = originalMethod;
  };
}());
