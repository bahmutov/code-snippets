/* measures how long an idle digest cycle (nothing has changed, just running all
dirty checking watchers) takes for a scope surrounding given selector.
Use: run this code snippet, then profileDirectiveDigest('#foo'); to measure
watchers in the #foo element (and its children along the scope tree).
*/
function profileDirectiveDigest(selector) {
  console.assert(selector && typeof selector === 'string', 'expected selector', selector);
  var el = document.querySelector(selector);
  console.assert(el, 'cannot find element with selector', selector);

  /* global angular */
  var ngEl = angular.element(el);
  var scope = ngEl.scope() || ngEl.isolateScope();
  console.assert(scope, 'cannot find scope from element', selector);
  console.time(selector + ' digest');
  scope.$digest();
  console.timeEnd(selector + ' digest');
}
