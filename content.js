/* global h */
var state = {
  isLinkHinting: false,
  isInsertHinting: false,
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
document.addEventListener('keydown', handleNavKeys, true);
document.addEventListener('keyup', handleLinkKey, true);
document.addEventListener('keyup', handleInsertKey, true);

/**
 * Navigational key handler
 * @param {object} e - the event
 */
function handleNavKeys(e) {
  // disable the navigational keys if in an input field
  if (h.isEditable(e.target) || e.ctrlKey || e.metaKey || e.altKey) {
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
    case 71: // 'g'
      if (e.shiftKey) {
        window.scrollTo(0, document.body.scrollHeight);
      } else {
        window.scrollTo(0, 0);
      }
      break;
    case 8: // backspace
      if (e.shiftKey) {
        window.history.go(1);
      } else {
        window.history.go(-1);
      }
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
    case 81: // 'q'
      h.sendMessage({
        type: 'close'
      });
  }
}

/**
 * Link hint key handler
 * @param {object} e - the event
 */
function handleLinkKey(e) {
  // disable in input fields
  if (h.isEditable(e.target) || e.shiftKey || e.ctrlKey || e.metaKey || e.altKey) {
    return void 0;
  }

  if (e.which === 70) { // 'f'
    // add the on-screen links to the state
    state.linksInView = state.allLinks.filter(h.isOnScreen);

    if (!state.isLinkHinting) {
      // add hints, disable nav keys and enable keyboard capture
      state.isLinkHinting = true;
      state.linksInView.forEach(h.addHint);
      document.removeEventListener('keydown', handleNavKeys, true);
      document.addEventListener('keyup', captureKeyboard, true);
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
    if (!state.isInsertHinting) {
      // add hints, disable nav keys and enable keyboard capture
      state.isInsertHinting = true;
      state.inputsInView.forEach(h.addHint);
      document.removeEventListener('keydown', handleNavKeys, true);
      document.addEventListener('keyup', captureKeyboard, true);
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
      if (e.shiftKey && state.isLinkHinting) {
        // send to background as an action to open in new tab
        h.sendMessage({
          type: 'link',
          payload: state.hints[last].el.href
        });
        // just simulate a click & focus
      } else {
        state.hints[last].el.click();
        state.hints[last].el.focus();
        resetCapture();
      }
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
  state.isLinkHinting = false;
  state.isInsertHinting = false;
  document.addEventListener('keydown', handleNavKeys, true);
}
