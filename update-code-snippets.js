// updates code snippets from remote repo
var snippets = JSON.parse(localStorage.scriptSnippets);
console.log('I have', snippets.length, 'code snippets');
console.table(snippets);

var repo = 'https://rawgit.com/bahmutov/code-snippets/master/';
var filename = 'ng-idle-apply-timing.js';

function fetch(url) {
  return new Promise(function (resolve, reject) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    // request.setRequestHeader('Access-Control-Allow-Origin', '*');
    // request.setRequestHeader('Access-Control-Allow-Headers', '*');

    request.onload = function () {
      if (request.status >= 200 && request.status < 400) {
        resolve(request.responseText);
      } else {
        reject(request.responseText);
      }
    };

    request.onerror = function (err) {
      reject(err);
    };


    request.send();

    // 'Content-Type': 'text/javascript; charset=utf-8'
  });
}

fetch(repo + filename)
  .then(function (source) {
    console.log('fetched new source for', filename);
    console.log(source);
  }, function (err) {
    throw err;
  });
