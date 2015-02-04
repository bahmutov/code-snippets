(function profileMethodCall(root) {
  'use strict';

  var name = 'primesApp';
  var methodName = 'findFirstPrimes';

  var object = root[name];
  console.assert(object, 'cannot find object ' + name + ' to profile');

  var originalMethod = object[methodName];
  console.assert(typeof originalMethod === 'function', 'cannot find method ' + methodName);

  object[methodName] = function () {
    console.profile(methodName);
    originalMethod.call(object);
    console.profileEnd(methodName);

    object[methodName] = originalMethod;
    console.log('restored the original method call');
  };
  console.log('wrapped', name + '.' + methodName + ' in profiling calls');
}(this));
