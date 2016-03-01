/*
Removes all elements except for the trees rooted
in the given selectors. Selectors are queried using querySelectorAll

For example, given a document

body
  div.foo
    span
  div#bar
    div#baz
      hello

and command with selectors ('.foo', '#baz') will leave
everything in place, but command ('#baz') will leave just

body
  div#bar
    div#baz
      hello
*/
(function hideAllBut() {
  'use strict';

  const selectors = Array.from(arguments);
  if (!selectors.length) {
    throw new Error('Need at least one selector to leave');
  }

  const keep = selectors.reduce(function (all, selector) {
    return all.concat(Array.from(document.querySelectorAll(selector)));
  }, []);

  function shouldKeep(el) {
    return keep.some(function (keepElement) {
      return keepElement.contains(el) || el.contains(keepElement);
    });
  }

  const all = Array.from(document.body.querySelectorAll('*'));
  var removed = 0;

  all.forEach(function (el) {
    if (!shouldKeep(el)) {
      el.parentNode.removeChild(el);
      removed += 1;
    }
  });

  console.log('removed %d elements', removed);
}('.foo'));
