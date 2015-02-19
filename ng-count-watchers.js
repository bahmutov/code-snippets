// taken from http://ng.malsup.com/#!/counting-watchers
(function countAngularWatchers(angular) {
  var i, data, scope,
    count = 0,
    all = document.all,
    len = all.length,
    test = {};

  var mostWatchers = 0;

  function countScopeWatchers(scope, element) {
    test[scope.$id] = true;
    var n = scope.$$watchers.length;
    count += n;
    if (n > mostWatchers) {
      console.log('most watchers', n);
      console.log(element);
      mostWatchers = n;
    }
  }

  // go through each element. Count watchers if it has scope or isolate scope
  for (i = 0; i < len; i += 1) {
    var el = angular.element(all[i]);
    data = el.data();
    scope = data.$scope || data.$isolateScope;
    if (scope && scope.$$watchers) {
      if ( !test[ scope.$id ] ) {
        countScopeWatchers(scope, el);
      }
    }
  }
  console.log('this page has', count, 'angular watchers');
  return count;
}(window.angular));
