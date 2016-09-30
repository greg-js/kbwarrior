chrome.runtime.onMessage.addListener(function(req) {
  if (req.from == 'content.js') {
    chrome.tabs.query({
      currentWindow: true,
      active: true
    }, function(tab) {
      chrome.tabs.update(tab.id, {
        url: req.message
      });
    });
  }
});
