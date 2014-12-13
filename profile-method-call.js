(function profileMethodCall() {
  var object = primesApp;
  var methodName = 'findFirstPrimes';
  var originalMethod = object[methodName];
  console.assert(typeof originalMethod === 'function', 'cannot find method ' + methodName);
  object[methodName] = function () {
    console.profile(methodName);
    originalMethod.call(object);
    console.profileEnd(methodName);
    // restore original methodName
    object[methodName] = originalMethod;
  };
}());
