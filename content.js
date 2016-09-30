var state = {
  isHinting: false,
  allLinks: Array.prototype.slice.call(document.querySelectorAll('a')),
  currentHint: 0,
  hints: {},
  currentInput: []
};

var keys = [
  's', 'g', 'a', 'v', 'n', 't', 'y', 'r', 'b', 'm',
  'i', 'o', 'w', 'e', 'c', 'x', 'z', 'p', 'q'
];

if (document.activeElement.tagName !== 'INPUT') {
  addListener(document, 'keydown', handleNavKeys, true);
  addListener(document, 'keydown', handleHintKey, true);
}

document.querySelectorAll('input').forEach(function(el) {
  if (!el.classList.contains('kbw-input')) {
    el.addEventListener('focus', function() {
      removeListener(document, 'keydown', handleNavKeys, true);
      removeListener(document, 'keydown', handleHintKey, true);
    });
    el.addEventListener('blur', function() {
      addListener(document, 'keydown', handleNavKeys, true);
      addListener(document, 'keydown', handleHintKey, true);
    });
  }
});

function addListener(el, action, handler, bool) {
  el.addEventListener(action, handler, bool);
}

function removeListener(el, action, handler, bool) {
  el.removeEventListener(action, handler, bool);
}

function handleNavKeys(e) {
  switch (e.which) {
    case 75: // 'k'
      window.scrollBy(0, -40);
      break;
    case 74: // 'j'
      window.scrollBy(0, 40);
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
  }
}

function handleHintKey(e) {
  if (e.which === 70) { // 'f'
    state.linksInView = state.allLinks.filter(isOnScreen);

    if (!state.isHinting) {
      state.linksInView.forEach(addHint);
      removeListener(document, 'keydown', handleNavKeys, true);
      addListener(document, 'keydown', captureHintKeys, true);
    } else {
      removeListener(document, 'keydown', captureHintKeys, true);
      state.allLinks.forEach(removeHint);
      state.currentHint = 0;
      addListener(document, 'keydown', handleNavKeys, true);
    }

    state.isHinting = !state.isHinting;
  }
}

function captureHintKeys(e) {
  var last;

  // push the last key onto the state
  state.currentInput.push(String.fromCharCode(e.which).toLowerCase());

  // single char hints
  if (state.linksInView.length < 19) {
    last = state.currentInput[state.currentInput.length - 1];
  // double char hints
  } else {
    last = state.currentInput.slice(-2).join('');
  }

  // look for hits in the existing hints links
  // if hit, send a runtime message to background.js
  if (state.hints[last]) {
    chrome.runtime.sendMessage({
      from: 'content.js',
      message: state.hints[last]
    });
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

function addHint(el) {
  var hintHead = getHint(state.currentHint++, state.linksInView.length);

  el.innerHTML = '<span class="kbw-hint">' + hintHead + '</span>' + el.innerHTML;

  state.hints[hintHead] = el.href;
}

function removeHint(el) {
  el.innerHTML = el.innerHTML.replace(/^.+kbw-hint">\w+?<\/span>/, '');
}

function getHint(current, max) {
  if (max < 19) {
    return keys[current];
  } else {
    return keys[Math.floor(current / 18)] + keys[(current % 18)];
  }
}
