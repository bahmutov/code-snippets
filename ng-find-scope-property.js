// finds all properties with given name attached to the scopes
function findScopeProperty(name) {
    var i, data, scope,
        all = document.all,
        len = all.length,
        test = {};
    var found = [];

    for (i=0; i < len; i++) {
        data = angular.element(all[i]).data();
        var scope = data.$scope || data.$isolateScope;
        if (scope && scope.hasOwnProperty(name)) {
            if ( ! test[ scope.$id ] ) {
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
