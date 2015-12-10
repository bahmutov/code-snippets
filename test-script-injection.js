/*
  This code snippet checks if the page allows creating
  and executing new inline scripts (script-injection attacks)
  See https://github.com/bahmutov/disable-inline-javascript-tutorial
*/
(function testInlineScriptInjection() {
  var el = document.createElement('script');
  el.innerText = 'alert("hi there")';
  document.body.appendChild(el); // runs the code by default
}());

(function testExternalScriptInjection() {
  var el = document.createElement('script');
  el.src = 'https://rawgit.com/hakimel/reveal.js/tree/master/js';
  document.body.appendChild(el);
}());
