// time action with separate start and finish callbacks
// for example
/*
  worker.onmessage = function (e) {
    console.log('worker has finished');
    renderPrimes(e.data);
  };
  document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#find').addEventListener('click', function () {
      var n = Number(document.querySelector('#n').value);
      primesApp.findFirstPrimes(n);
    });
  });

  you can profile as

  timeSeparateCallback(primesApp, 'findFirstPrimes', worker, 'onmessage');
*/
(function timeSeparateCallback(obj1, methodName1, obj2, methodName2) {
  'use strict';

  console.assert(obj1, 'missing first object');
  console.assert(obj2, 'missing second object');

  var m1 = obj1[methodName1];
  console.assert(typeof m1 === 'function', 'cannot find first method ' + methodName1);
  var m2 = obj2[methodName2];
  console.assert(typeof m2 === 'function', 'cannot find first method ' + methodName2);

  obj1[methodName1] = function () {
    console.profile('separate');
    console.time('separate');
    m1.apply(obj1, arguments);
  };

  obj2[methodName2] = function () {
    console.timeEnd('separate');
    console.profileEnd('separate');
    m2.apply(obj2, arguments);
  };

  console.log('wrapped', methodName1, 'and', methodName2, 'in timing calls');

  // modify the arguments below
}(window, 'postMessage', window, 'onmessage'));
