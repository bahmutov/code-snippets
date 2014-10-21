/*
  Changes data to some dummy on the scope, then runs digest cycle.
  Saves CPU profile.
*/
(function profileDataChange() {
  var selector = 'study-line-chart';
  var propertyName = 'selectedBenchmarks';
  var name = selector + ':' + propertyName;

  var el = angular.element(selector);
  var scope = el.scope() || el.isolateScope();
  console.assert(scope, 'cannot find scope from ' + name);

  var property = scope[propertyName];
  console.assert(property, 'missing ' + name);
  var $timeout = el.injector().get('$timeout');

  function digestCycle() {
    angular.element(document).injector().get('$rootScope').$apply();
  }

  property.foo = 'foo';

  console.profile(name);
  console.time(name);

  digestCycle();

  console.timeStamp('finished', name);

  console.timeEnd(name);
  console.profileEnd();

  delete property.foo;

  digestCycle();
}());
