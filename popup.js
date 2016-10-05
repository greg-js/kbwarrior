document.addEventListener('DOMContentLoaded', function() {
  var html = document.querySelector('html');
  var body = document.body;
  var buttonInstr = document.querySelector('.kbw-instructions');
  var buttonProj = document.querySelector('.kbw-project-home');
  var buttonBlog = document.querySelector('.kbw-gregjs');

  buttonInstr.addEventListener('click', function() {
    if (body.style.height !== '575px') {
      body.style.height = '575px';
      html.style.height = '575px';
    } else {
      html.style.height = '130px';
      body.style.height = '130px';
    }
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
