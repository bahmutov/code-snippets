# Chrome DevTools code snippets

> Performance, debugging and testing code snippets to be run in Chrome DevTools

![fist paint](https://raw.githubusercontent.com/bahmutov/code-snippets/master/first-paint-code-snippet.png)

All snippets, including mine are distributed under MIT license.

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
