// Finds total size of objects attached to the scopes
(function ngScopeSize() {

  var i, data, scope,
        count = 0,
        all = document.all,
        len = all.length,
        test = {},
        scopes = 0;

  /*
  sizeof.js modified for angular scope client data computation
  A function to calculate the approximate memory usage of objects
  Created by Stephen Morley - http://code.stephenmorley.org/ - and released under
  the terms of the CC0 1.0 Universal legal code:
  http://creativecommons.org/publicdomain/zero/1.0/legalcode
  */

  /* Returns the approximate memory usage, in bytes, of the specified object. The
   * parameter is:
   *
   * object - the object whose size should be determined
   */
   /* jshint -W073, -W071 */
  function sizeof(object){

    // initialise the list of objects and size
    var objects = [object];
    var size = 0;

    // loop over the objects
    for (var index = 0; index < objects.length; index += 1) {

      // determine the type of the object
      switch (typeof objects[index]) {

        case 'boolean': {
          size += 4; break;
        }

        case 'number': {
          size += 8; break;
        }

        case 'string': {
          size += 2 * objects[index].length;
          break;
        }

        case 'object': {

          // loop over the keys
          for (var key in objects[index]) {
            if (!objects[index].hasOwnProperty(key)) {
              continue;
            }
            if (key[0] === '$' || key === 'this' || key === 'constructor' || key === 'lenth') {
              continue; // angular's internal property ($apply, etc)
            }

            // determine whether the value has already been processed
            var processed = false;
            /* jshint -W073 */
            for (var search = 0; search < objects.length; search += 1){
              if (objects[search] === objects[index][key]){
                processed = true;
                break;
              }
            }

            // queue the value to be processed if appropriate
            if (!processed) {
              objects.push(objects[index][key]);
            }

          }
        }

      }

    }

    // return the calculated size
    return size;

  }

  // go through each element. Count watchers if it has scope or isolate scope
  /* eslint no-for-loops:0 */
  for (i = 0; i < len; i++) {
    /* global angular */
    data = angular.element(all[i]).data();
    scope = data.$scope || data.$isolateScope;
    if (scope) {
      if ( !test[ scope.$id ] ) {
        test[ scope.$id ] = true;
        count += sizeof(scope);
        scopes += 1;
      }
    }
  }
  console.log(scopes, 'scopes have', count, 'bytes attached');
  return count;

}());
