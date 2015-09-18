// Measures how long a idle apply cycle takes
// More watchers - longer cycle
// More complicated expression logic - longer cycle
// Also creates CPU profile for debugging bottlenecks (Chrome DevTools)

// assumes the angular application is at least around the document's body

/* global angular, performance */
angular.element(document.body).injector().invoke(function timeApply($rootScope) {
  console.profile('$apply');
  var started = performance.now();
  $rootScope.$apply();
  var takes = performance.now() - started;
  console.log('idle $apply takes', takes, 'ms');
  console.profileEnd();
  return takes;
});
