(function downloadAndRunCodeSnippet() {
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
