/*
  Wraps a method on a scope (found from selector + method name)
  with profiling. After method stops, restores the original non-profiled method
  Method should return a promise.
  Typical use: profile button click.

  $scope.myMethod = function () ...
  where $scope could be determined from element '#my-selector'
*/
(function profileScopeMethod() {
  var selector = '#my-selector';
  var methodName = 'myMethod';
  var name = selector + ':' + methodName;

  var el = angular.element(selector);
  var scope = el.scope() || el.isolateScope();
  console.assert(scope, 'cannot find scope from ' + name);

  var fn = scope[methodName];
  console.assert(typeof fn === 'function', 'missing ' + methodName);
  var $timeout = el.injector().get('$timeout');

  scope[methodName] = function () {
    console.profile(name);
    console.timeline(name);
    console.time(name);

    // assuming method returns a promise!
    fn().finally(function finishedMethod() {
      console.timeStamp('finished', methodName);

      $timeout(function afterDOMUpdate() {
        console.timeStamp('dom updated after', methodName);
        console.timeEnd(name);
        console.timelineEnd(name);
        console.profileEnd();
        scope[methodName] = fn;
        console.log('restored', name);
      }, 0);
    });
  };
  console.log('wrapped', name, 'for measurements');
 // el.trigger('click');
}());
