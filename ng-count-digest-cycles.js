/*
  Adds a watch expression on the root scope that counts the number of times
  it was called. After method stops, restores the original method and
  prints number of times digest cycle was run.
  Method can return a promise.
  Typical use: see how many times the full digest cycle is triggered.

  $scope.myMethod = function () ...
  where $scope could be determined from element 'my-selector'
*/
(function countDigestCycles() {
  var selector = 'button';
  var methodName = 'doSomething';
  var name = selector + ':' + methodName;

  /* global angular */
  var el = angular.element(document.getElementById(selector));
  var scope = el.scope() || el.isolateScope();
  console.assert(scope, 'cannot find scope from ' + name);

  var fn = scope[methodName];
  console.assert(typeof fn === 'function', 'missing ' + methodName);
  var $rootScope = el.injector().get('$rootScope');

  var count = 0;
  $rootScope.$watch(function () {
    count += 1;
    console.log('digest cycle ran', count, 'times');
  });

  var $q = el.injector().get('$q');

  scope[methodName] = function () {

    count = 0;

    // method can return a value or a promise
    var returned = fn();
    $q.when(returned).finally(function finishedMethod() {
      scope.$$postDigest(function () {
        scope[methodName] = fn;
        console.log('restored', methodName);
      });
    });
  };
  console.log('wrapped', name, 'for measuring number of digest cycles');

}());
