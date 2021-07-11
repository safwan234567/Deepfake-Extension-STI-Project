chrome.tabs.onUpdated.addListener(
  function(tabId, changeInfo, tab) {
    // read changeInfo data and store in local storage
    if (changeInfo.url) {
      chrome.tabs.sendMessage( tabId, {
        message: 'URL Changed!',
        url: changeInfo.url
      })
      value = { url: changeInfo.url };
      chrome.storage.local.set({"dfe": { url: changeInfo.url }}, function() {
        console.log('URL is set to ' + changeInfo.url);
      });
    }
  }
);

chrome.action.onClicked.addListener(
  function() {
    chrome.tabs.sendMessage( tabId, {
      message: 'open'
    });
  }
);