// finds all properties with given name attached to the scopes
(function (window) {

  function findScopeProperty(name) {
    var i, data, scope,
    all = document.all,
    len = all.length,
    test = {};
    var found = [];

    /* global angular */
    /* eslint no-for-loops:0 */
    for (i = 0; i < len; i++) {
      data = angular.element(all[i]).data();
      scope = data.$scope || data.$isolateScope;
      if (scope && scope.hasOwnProperty(name)) {
        if ( !test[ scope.$id ] ) {
          test[ scope.$id ] = true;
          found.push(scope);
        }
      }
    }
    if (!found.length) {
      console.log('could not find any scopes with', name, 'property');
    } else {
      console.log('found', found.length, 'scopes with property', name);
    }
    return found;
  }

  window.findScopeProperty = findScopeProperty;
}(window));
