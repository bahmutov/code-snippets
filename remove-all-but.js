/*
Removes all elements except for the trees rooted
in the given selectors.

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
  function toArray(what) {
    return Array.prototype.slice.call(what, 0);
  }
  const selectors = toArray(arguments);
  if (!selectors.length) {
    throw new Error('Need at least one selector to leave');
  }

  const keep = selectors.map(function (selector) {
    return document.querySelector(selector);
  });

  function shouldKeep(el) {
    return keep.some(function (keepElement) {
      return keepElement.contains(el) || el.contains(keepElement);
    });
  }

  const all = toArray(document.body.querySelectorAll('*'), 0);
  var removed = 0;

  all.forEach(function (el) {
    if (!shouldKeep(el)) {
      el.parentNode.removeChild(el);
      removed += 1;
    }
  });

  console.log('removed %d elements', removed);
}('.foo', '#baz'));
