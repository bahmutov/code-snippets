# Chrome DevTools code snippets

> Performance, debugging and testing code snippets to be run in Chrome DevTools

![fist paint](https://raw.githubusercontent.com/bahmutov/code-snippets/master/first-paint-code-snippet.png)

Read [Code Snippets tutorial][1] and 
[How to improve Angular application performance using code snippets][2].

## Snippets

### generic performance

* [boilerplate.js](boilerplate.js) - boilerplate for loading and running a remote code script 
(see [remote download](#remote-download)).
* [first-paint.js](first-paint.js) - time from page reload to first visible contents.
* [timing.js](timing.js) - Detailed page timing information, 
from [addyosmani/timing.js](https://github.com/addyosmani/timing.js).
* [time-method-call.js](time-method-call.js) - measures single method call time.
* [profile-method-call.js](profile-method-call.js) - profiles a single method call.
* [local-storage-size.js](local-storage-size.js) - measures size of the strings in the `localStorage`.
* [expensive-keys.js](expensive-keys.js) - measures how much space individual keys and their values
take up in a collection of objects, read [Measuring Space Allocation][measure].
* [keys-vs-values.js](keys-vs-values.js) - measures length of keys vs length of values in an array.

### Angular performance

* [ng-count-watchers.js](ng-count-watchers.js) - counts total watchers in the page. 
More watchers - slower digest cycle.
* [ng-idle-apply-timing.js](ng-idle-apply-timing.js) - measures how long a digest cycle takes without 
any data changes. This measures purely how long all watched expressions take to compute and compare
to previous values (dirty checking).
* [ng-profile-scope-method.js](ng-profile-scope-method.js) - installs profile calls around a given
scope method. When the method completes, the original non-instrumented version will be restored.
The browser will have timeline and CPU profile.
* [ng-run-digest-cycle.js](ng-run-digest-cycle.js) - triggers digest cycle starting with root scope.
* [ng-profile-data-change.js](ng-profile-data-change.js) - changes data on the scope, runs digest cycle
to profile listeners.
* [ng-scope-size.js](ng-scope.size.js) - finds total size of all user objects attached to all scopes.
Smaller data - faster copying and comparison during digest cycle.
* [ng-find-scope-property.js](ng-find-scope-property.js) - finds all scopes that own a property
with given name.
* [ng-profile-local-digest.js](ng-profile-local-digest.js) - runs idle digest cycle starting at the scope
that surrounds given selector. Useful to find parts of the page with expensive watchers.
* [ng-find-expensive-digest.js](ng-find-expensive-digest.js) builds upon ng-profile-local-digest.js to measure
digest duration for several selectors and print sorted table starting with the slowest digest duration.

All snippets, including mine are distributed under MIT license.

## Remote download

You can download and run a snippet by using the following boilerplate 
(scripts are via downloaded via [RawGit](https://rawgit.com/))

```js
(function firstPaintRemote() {
  // form rawGit proxy url
  var ghUrl = 'bahmutov/code-snippets/master/first-paint.js';
  var rawUrl = 'https://rawgit.com/' + ghUrl;
  // download and run the script
  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = rawUrl;
  head.appendChild(script);
}());
```

![remote](https://raw.githubusercontent.com/bahmutov/code-snippets/master/first-paint-code-snippet-remote.png)

### Small print

Author: Gleb Bahmutov &copy; 2014

* [@bahmutov](https://twitter.com/bahmutov)
* [glebbahmutov.com](http://glebbahmutov.com)
* [blog](http://bahmutov.calepin.co/)

License: MIT - do anything with the code, but don't blame me if it does not work.

Spread the word: tweet, star on github, etc.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/code-snippets/issues?state=open) on Github

[1]: http://bahmutov.calepin.co/chrome-devtools-code-snippets.html
[2]: http://bahmutov.calepin.co/improving-angular-web-app-performance-example.html
[measure]: http://bahmutov.calepin.co/measure-space-allocation.html
