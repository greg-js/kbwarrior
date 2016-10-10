/* global state */

var h = (function() { // eslint-disable-line
  /**
   * Check for editable fields (handlers should not work there)
   * @param {el} el - the element being checked
   */
  function isEditable(el) {
    return (
      /^input|^textarea/i.test(el.tagName) ||
      el.classList.contains('editable') ||
      /^$|^true$/.test(el.contenteditable)
    );
  }

  /**
   * get an array of all elements, filtering out hidden, disabled & submits
   * @param {string} selector - a css/jquery style selector
   */
  function getAll(selector) {
    var els = Array.prototype.slice.call(document.querySelectorAll(selector));
    return els.filter(function(el) {
      return el.type !== 'hidden' && !el.disabled &&
             el.style.display !== 'none' && el.type !== 'submit';
    });
  }

  /**
   * Determine whether a given element is in the viewport or not
   * @param {HTMLElement} el - the element
   */
  function isOnScreen(el) {
    var elRect = el.getBoundingClientRect();
    var viewWidth = document.documentElement.clientWidth;
    var viewHeight = document.documentElement.clientHeight;

    return (
      (elRect.top    >= 0) &&
      (elRect.right  <= viewWidth) &&
      (elRect.bottom <= viewHeight) &&
      (elRect.left   >= 0)
    ) && (el.type !== 'hidden' || el.hidden === true);
  }

  /**
   * Add a hint to a given element
   * @param {HTMLElement} el - the element
   */
  function addHint(el) {
    var hintHead = getHint(state.currentHint++, state.linksInView.length);
    var span = createHintSpan(hintHead);

    // insert the span as a sibling of the element
    el.parentNode.insertBefore(span, el);

    // add this hint to the state
    state.hints[hintHead] = {
      type: 'link',
      el: el
    };
  }

  /**
   * Create a span element with a hint string
   * @param {string} str - the hint string
   */
  function createHintSpan(str) {
    var span = document.createElement('span');
    span.classList.add('kbw-hint');
    span.textContent = str;
    return span;
  }

  /**
   * Remove the hint for a given element
   * @param {HTMLElement} el - the element
   */
  function removeHintHTML() {
    document.querySelectorAll('span').forEach(function(span) {
      if (span.classList.contains('kbw-hint')) {
        span.parentNode.removeChild(span);
      }
    });
  }

  /**
   * Calculate the name of the current hint
   * @param {number} current - the current hint position
   * @param {number} max - the total amount of hints to be created
   */
  function getHint(current, max) {
    // one letter suffices
    if (max < 25) {
      return state.keys[current];
    // must use two letters
    } else {
      return state.keys[Math.floor(current / 24)] + state.keys[(current % 24)];
    }
  }

  /**
   * Send a message to background.js which has access to chrome.tabs
   * @param {object} msg - the message - has a type and a payload
   */
  function sendMessage(msg) {
    chrome.runtime.sendMessage({
      from: 'content.js',
      message: msg
    });
  }

  return {
    getAll: getAll,
    isEditable: isEditable,
    isOnScreen: isOnScreen,
    addHint: addHint,
    createHintSpan: createHintSpan,
    removeHintHTML: removeHintHTML,
    getHint: getHint,
    sendMessage: sendMessage
  };
}());
