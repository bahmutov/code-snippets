(function timeMethodCall(root) {
  'use strict';

  var name = 'primesApp';
  var methodName = 'findFirstPrimes';

  var object = root[name];
  console.assert(object, 'cannot find object ' + name + ' to profile');

  var originalMethod = object[methodName];
  console.assert(typeof originalMethod === 'function', 'cannot find method ' + methodName);

  object[methodName] = function () {
    console.time(methodName);
    originalMethod.call(object);
    console.timeEnd(methodName);

    object[methodName] = originalMethod;
    console.log('restored the original method call');
  };
  console.log('wrapped', name + '.' + methodName + ' in timing calls');
}(this));
