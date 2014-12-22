// taken from http://ng.malsup.com/#!/counting-watchers
(function countAngularWatchers() {
  var i, data, scope,
  count = 0,
  all = document.all,
  len = all.length,
  test = {};

  // go through each element. Count watchers if it has scope or isolate scope
  /* eslint no-for-loops:0 */
  for (i = 0; i < len; i++) {
    /* global angular */
    data = angular.element(all[i]).data();
    scope = data.$scope || data.$isolateScope;
    if (scope && scope.$$watchers) {
      if ( !test[ scope.$id ] ) {
        test[ scope.$id ] = true;
        count += scope.$$watchers.length;
      }
    }
  }
  console.log('this page has', count, 'angular watchers');
  return count;
})();
