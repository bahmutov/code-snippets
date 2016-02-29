/*
  Read the following blog post
  http://krasimirtsonev.com/blog/article/enforce-standards-while-submitting-a-pull-request
*/
(function () {
  var textareaId = '#pull_request_body';
  var textarea = document.querySelector(textareaId);
  var template = '';
  var firstLine;

  template += firstLine = 'ID (ticket/card/issue): ';
  template += '\n\n';
  template += '## Task/Problem\n\n';
  template += '## Solution\n\n';
  template += '## Steps to reproduce\n\n';
  template += '## UAT\n\n';
  template += '## Code review\n\n\n';
  template += '- [ ] Unit tests passed\n';
  template += '- [ ] System tests passed\n';

  if (textarea) {
    textarea.value = template;
    textarea.focus();
    textarea.scrollTop = 0;
    textarea.selectionStart = textarea.selectionEnd = firstLine.length;
  } else {
    /* global alert */
    /* eslint no-alert:0 */
    alert('You are either not on the PR page or there is no ' + textareaId + ' element.');
  }
})();
