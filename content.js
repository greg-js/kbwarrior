var state = {
  isHinting: false,
  allLinks: Array.prototype.slice.call(document.querySelectorAll('a'))
};

if (document.activeElement.tagName !== 'INPUT') {
  addKeyboardListeners();
}

document.querySelectorAll('input').forEach(function(el) {
  el.addEventListener('focus', function() {
    removeKeyboardListeners();
  });
  el.addEventListener('blur', function() {
    addKeyboardListeners();
  });
});

function addKeyboardListeners() {
  document.addEventListener('keydown', handleKeys, true);
}

function removeKeyboardListeners() {
  document.removeEventListener('keydown', handleKeys, true);
}

function handleKeys(e) {
  switch (e.which) {
    case 75: // 'k'
      window.scrollBy(0, -30);
      break;
    case 74: // 'j'
      window.scrollBy(0, 30);
      break;
    case 72: // 'h'
      window.scrollBy(-15, 0);
      break;
    case 76: // 'l'
      window.scrollBy(15, 0);
      break;
    case 68: // 'd'
      window.scrollBy(0, window.innerHeight/2);
      break;
    case 85: // 'u'
      window.scrollBy(0, -window.innerHeight/2);
      break;
    case 70: // 'f'
      var linksInView = state.allLinks.filter(isOnScreen);

      if (!state.isHinting) {
        linksInView.forEach(addBorder);
      } else {
        state.allLinks.forEach(removeBorder);
      }

      state.isHinting = !state.isHinting;
      break;
    default:
      break;
  }
}

function isOnScreen(el) {
  var elRect = el.getBoundingClientRect();
  var viewWidth = document.documentElement.clientWidth;
  var viewHeight = document.documentElement.clientHeight;

  return (
    (elRect.top    >= 0) &&
    (elRect.right  <= viewWidth) &&
    (elRect.bottom <= viewHeight) &&
    (elRect.left   >= 0)
  );
}

function addBorder(el) {
  el.classList.add('kbwarrior-bordered');
}

function removeBorder(el) {
  el.classList.remove('kbwarrior-bordered');
}
