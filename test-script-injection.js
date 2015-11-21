/*
  This code snippet checks if the page allows creating
  and executing new inline scripts (script-injection attacks)
  See https://github.com/bahmutov/disable-inline-javascript-tutorial
*/
(function testScriptInjection() {
  var el = document.createElement('script');
  el.innerText = 'alert("hi there")';
  document.body.appendChild(el); // runs the code by default
}());
