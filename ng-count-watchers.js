// taken from http://ng.malsup.com/#!/counting-watchers
/*
  Usage
    - just run the script and it will compute number of watchers on the page
    - select an element on the page using "Elements" tab
      and run `countAngularWatchers(angular, $0)` to count total watchers
      in the tree rooted at the selected element. Useful to find where the
      large numbers of watchers are "hiding"
*/
(function countAngularWatchers(angular, start) {
  window.countAngularWatchers = countAngularWatchers;

  function allDescendents(list, node) {
    list.push(node);
    Array.prototype.forEach.call(node.childNodes, function (child) {
      allDescendents(list, child);
    });
  }

  var i, data, scope,
      count = 0,
      all = document.all,
      test = {},
      watchers = [];

  if (start) {
    all = [];
    allDescendents(all, start);
  }
  console.log('counting watchers in', all.length, 'elements');
  var len = all.length;

  var mostWatchers = 0;
  var maxWatchersToPrint = 20;

  function countScopeWatchers(scope, element) {
    test[scope.$id] = true;
    var n = scope.$$watchers.length;
    count += n;
    if (n > 0){
      watchers.push.apply(watchers, scope.$$watchers);
    }
    if (n > mostWatchers) {
      console.log('most watchers', n);
      console.log(element);
      mostWatchers = n;

    }
  }

  function countWatchersInData(el) {
    data = el.data();
    if (data) {
      scope = data.$scope || data.$isolateScope;
      if (scope && scope.$$watchers) {
        if (!test[scope.$id]) {
          countScopeWatchers(scope, el);
        }
      }
    }
  }

  // go through each element. Count watchers if it has scope or isolate scope
  for (i = 0; i < len; i += 1) {
    var el = angular.element(all[i]);
    countWatchersInData(el);
  }
  console.log('this page has ' + watchers.length + ' angular watchers');
  if (watchers.length < maxWatchersToPrint) {
    console.log('the watchers are:', watchers);
  }
  return count;
}(window.angular));
