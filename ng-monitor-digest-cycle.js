/*
  uses console.monitor to print a message every time
  the digest cycle runs.
*/
(function monitorDigestCycle(angular) {
  var injector = angular.element(document.body).injector();
  if (!injector) {
    throw new Error('Missing Angular injector on the document body');
  }
  var $rootScope = injector.get('$rootScope');
  function dummy() {
    console.count('digest cycle');
  }
  window.stopWatching = $rootScope.$watch(dummy);
  console.log('run window.stopWatching() to stop watching the digest cycle');
}(window.angular));
