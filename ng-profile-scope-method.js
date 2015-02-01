/*
  Wraps a method on a scope (found from selector + method name)
  with profiling. After method stops, restores the original non-profiled method
  Method can return a promise.
  Typical use: profile button click.

  $scope.myMethod = function () ...
  where $scope could be determined from element 'my-selector'
*/
(function profileScopeMethod() {
  var selector = 'find';
  var methodName = 'find';
  var name = selector + ':' + methodName;

  /* global angular */
  var el = angular.element(document.getElementById(selector));
  var scope = el.scope() || el.isolateScope();
  console.assert(scope, 'cannot find scope from ' + name);

  var fn = scope[methodName];
  console.assert(typeof fn === 'function', 'missing ' + methodName);
  var $timeout = el.injector().get('$timeout');
  var $q = el.injector().get('$q');

  scope[methodName] = function () {
    console.profile(name);
    console.time(name);

    // method can return a value or a promise
    var returned = fn();
    $q.when(returned).finally(function finishedMethod() {
      console.timeStamp('finished', methodName);

      $timeout(function afterDOMUpdate() {
        console.timeStamp('dom updated after', methodName);
        console.timeEnd(name);
        console.profileEnd();
        scope[methodName] = fn;
        console.log('restored', name);
      }, 0);
    });
  };
  console.log('wrapped', name, 'for measurements');
}());
