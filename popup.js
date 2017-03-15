var instructionsOpen = false;
var blacklistOpen = false;

document.addEventListener('DOMContentLoaded', function() {
  var html = document.querySelector('html');
  var body = document.body;
  var buttonInstr = document.querySelector('.kbw-instructions');
  var buttonBlacklist = document.querySelector('.kbw-blacklist');
  var buttonProj = document.querySelector('.kbw-project-home');
  var buttonBlog = document.querySelector('.kbw-gregjs');
  var tableDiv = document.getElementById('table-div');
  var listDiv = document.getElementById('blacklist-div');

  var heightClosed = buttonBlog.getBoundingClientRect().bottom + 10;
  var heightInstrOpen = heightClosed + tableDiv.offsetHeight + 10;
  var heightListOpen = heightClosed + listDiv.offsetHeight + 10;

  body.style.height = heightClosed;
  html.style.height = heightClosed;
  body.style.width = '190px';
  html.style.width = '190px';

  buttonBlacklist.addEventListener('click', function() {
    makeVisible(
      blacklistOpen ? heightClosed : heightListOpen,
      listDiv,
      instructionsOpen ? tableDiv : null
    );
    instructionsOpen = false;
    blacklistOpen = !blacklistOpen;
  });

  buttonInstr.addEventListener('click', function() {
    makeVisible(
      instructionsOpen ? heightClosed : heightInstrOpen,
      tableDiv,
      blacklistOpen ? listDiv : null
    );
    blacklistOpen = false;
    instructionsOpen = !instructionsOpen;
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

  function makeVisible(height, element, old) {
    if (old) old.style.display = 'none';
    element.style.display = 'block';
    body.style.height = height + 'px';
    html.style.height = height + 'px';
    body.style.width = '190px';
    html.style.width = '190px';
  }
});
