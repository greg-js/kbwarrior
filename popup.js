var opened = false;

document.addEventListener('DOMContentLoaded', function() {
  var html = document.querySelector('html');
  var body = document.body;
  var buttonInstr = document.querySelector('.kbw-instructions');
  var buttonProj = document.querySelector('.kbw-project-home');
  var buttonBlog = document.querySelector('.kbw-gregjs');
  var tableDiv = document.getElementById('table-div');

  var closedHeight = buttonBlog.getBoundingClientRect().bottom + 10 + 'px';
  var openedHeight = tableDiv.getBoundingClientRect().bottom + 10 + 'px';

  body.style.height = closedHeight;
  html.style.height = closedHeight;
  body.style.width = '190px';
  html.style.width = '190px';

  buttonInstr.addEventListener('click', function() {
    if (!opened) {
      body.style.height = openedHeight;
      html.style.height = openedHeight;
      body.style.width = '190px';
      html.style.width = '190px';
    } else {
      html.style.height = closedHeight;
      body.style.height = closedHeight;
    }
    opened = !opened;
  });

  buttonProj.addEventListener('click', function() {
    chrome.tabs.create({
      url: 'https://www.github.com/greg-js/kbwarrior'
    });
  });

  buttonBlog.addEventListener('click', function() {
    chrome.tabs.create({
      url: 'https://www.gregjs.com'
    });
  });
});
