// throws an exception from the digest cycle
// useful to test your exception handler service
// http://glebbahmutov.com/blog/catch-all-errors-in-angular-app/
(function throwErrorFromAngular(angular) {

  if (typeof angular === 'undefined') {
    throw new Error('Cannot find angular on the page');
  }
  // select any element in the Elements panel that is inside Angular app
  /* global $0 */
  var injector = angular.element($0).injector();
  if (!injector) {
    throw new Error('Cannot find injector, please select an element\n' +
      'INSIDE an angular app in the Elements panel');
  }
  injector.get('$rootScope').$apply(function () {
    throw new Error('Error from Angular digest cycle');
  });
}(window.angular));
