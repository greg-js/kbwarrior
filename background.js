/**
 * Receive URI messages from content.js and route to right function
 */
chrome.runtime.onMessage.addListener(function(req) {
  var msg;

  // check for source
  if (req.from === 'content.js') {
    msg = req.message;

    // close current tab
    if (msg.type === 'close') {
      closeTab();

    // open link in new window
    } else if (msg.type === 'link') {
      openNewTab(msg.payload);

    // switch tabs
    } else if (msg.type === 'tabs') {
      switchTab(msg.payload);
    }
  }
});

/**
 * Open a given url in a new window
 * @param {string} url - the url
 */
function openNewTab(url) {
  chrome.tabs.create({
    url: url
  });
}

/**
 * Close the current tab
 */
function closeTab() {
  // get active tab
  chrome.tabs.query({
    currentWindow: true,
    active: true
  }, function(activeTab) {
    chrome.tabs.remove(activeTab[0].id);
  });
}

/**
 * Switch to the next or previous tab in the current window
 * @param {number} mod - the modifier (1 or -1)
 */
function switchTab(mod) {
  // get the index of the active tab
  chrome.tabs.query({
    currentWindow: true,
    active: true
  }, function(activeTab) {
    var activeIndex = activeTab[0].index;

      // get amount of tabs for wrapping the end to the front
      chrome.tabs.query({
        currentWindow: true
      }, function(tabs) {
        // now calculate the new index and activate it
        var newIndex = (activeIndex + mod) % tabs.length;

        chrome.tabs.query({
          currentWindow: true,
          index: newIndex >= 0 ? newIndex : tabs.length - 1
        }, function(newTab) {
          chrome.tabs.update(newTab[0].id, {
            active: true
          });
        });
      });
  });
}
