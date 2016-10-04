/* global h */
var state = {
  isHinting: false,
  allLinks: h.getAll('a'),
  allInputs: h.getAll('input,textarea'),
  linksInView: [],
  inputsInView: [],
  currentHint: 0,
  hints: {},
  currentKeys: [],
  keys: [
    's', 'd', 'u', 'h', 'j', 'k', 'l', 'g', 'a', 'v', 'n', 't',
    'y', 'r', 'b', 'm', 'o', 'w', 'e', 'c', 'x', 'z', 'p', 'q'
  ]
};

// Attach the event handlers for nav, hint and insert features
document.addEventListener('keyup', handleNavKeys, true);
document.addEventListener('keyup', handleHintKey, true);
document.addEventListener('keyup', handleInsertKey, true);

/**
 * Navigational key handler
 * @param {object} e - the event
 */
function handleNavKeys(e) {
  // disable the navigational keys if in an input field
  if (h.isEditable(e.target) || e.ctrlKey || e.shiftKey || e.metaKey || e.altKey) {
    return void 0;
  }

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
    case 8: // backspace
      window.history.go(-1);
      break;
    case 78: // 'n'
      h.sendMessage({
        type: 'tabs',
        payload: 1
      });
      break;
    case 80: // 'p'
      h.sendMessage({
        type: 'tabs',
        payload: -1
      });
      break;
  }
}

/**
 * Hint key handler
 * @param {object} e - the event
 */
function handleHintKey(e) {
  // disable in input fields
  if (h.isEditable(e.target) || e.ctrlKey || e.shiftKey || e.metaKey || e.altKey) {
    return void 0;
  }

  if (e.which === 70) { // 'f'
    // add the on-screen links to the state
    state.linksInView = state.allLinks.filter(h.isOnScreen);

    if (!state.isHinting) {
      // add hints, disable nav keys and enable keyboard capture
      state.linksInView.forEach(h.addHint);
      document.removeEventListener('keyup', handleNavKeys, true);
      document.addEventListener('keyup', captureKeyboard, true);
      state.isHinting = true;
    } else {
      resetCapture();
    }
  }
}

/**
 * Insert key handler
 * @param {object} e - the event
 */
function handleInsertKey(e) {
  // disable in input fields
  if (h.isEditable(e.target) || e.ctrlKey || e.shiftKey || e.metaKey || e.altKey) {
    return void 0;
  }

  if (e.which === 73) { // 'i'
    state.inputsInView = state.allInputs.filter(h.isOnScreen);
    if (!state.isHinting) {
      // add hints, disable nav keys and enable keyboard capture
      state.inputsInView.forEach(h.addHint);
      document.removeEventListener('keyup', handleNavKeys, true);
      document.addEventListener('keyup', captureKeyboard, true);
      state.isHinting = true;
    } else {
      resetCapture();
    }
  }
}

/**
 * Keyboard capture for hint processing
 * @param {object} e - the event
 */
function captureKeyboard(e) {
  var last;

  if (!/^input|^textarea/i.test(e.target.tagName)) {
    // push the last key onto the state
    state.currentKeys.push(String.fromCharCode(e.which).toLowerCase());

    // single char hints
    if (state.linksInView.length < 19) {
      last = state.currentKeys[state.currentKeys.length - 1];
    // double char hints
    } else {
      last = state.currentKeys.slice(-2).join('');
    }

    // look for hits in the existing hints links
    if (state.hints[last]) {
      state.hints[last].el.click();
      state.hints[last].el.focus();
      resetCapture();
    }
  }
}

/**
 * Reset input capture
 */
function resetCapture() {
  // disable keyboard capture, reset hints and re-enable nav keys
  document.removeEventListener('keyup', captureKeyboard, true);
  h.removeHintHTML();
  state.currentHint = 0;
  state.hints = {};
  state.currentKeys = [];
  state.isHinting = false;
  document.addEventListener('keyup', handleNavKeys, true);
}
