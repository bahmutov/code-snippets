/*
  Almost the same as profile method call, but for wrapping methods that are on prototype
  function Foo() {}
  Foo.prototype.getName = function () { return this.name; }
  var foo = new Foo();
  foo.getName();

  // profile getName without getting foo reference
  profilePrototypeCall with proto = Foo.prototype;
  and method name 'getName'
*/
(function profilePrototypeCall(proto, methodName) {
  'use strict';

  console.assert(proto, 'cannot find prototype to profile');
  console.assert(typeof methodName === 'string', 'expected method name');

  var originalMethod = proto[methodName];
  console.assert(typeof originalMethod === 'function', 'cannot find method ' + methodName);

  proto[methodName] = function () {
    console.profile(methodName);

    originalMethod.apply(this, arguments);

    console.profileEnd(methodName);

    proto[methodName] = originalMethod;
    console.log('restored the prototype method call', methodName);
  };
  console.log('wrapped', methodName + ' in profiling calls');

  // some prototype and method name
}(this.Photostack.prototype, '_rotateItem'));
