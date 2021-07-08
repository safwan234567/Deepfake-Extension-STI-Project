chrome.tabs.onUpdated.addListener(
  function(tabId, changeInfo, tab) {
    // read changeInfo data and do something with it
    // like send the new url to contentscripts.js
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