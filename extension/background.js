chrome.tabs.onUpdated.addListener(
  function (tabId, changeInfo, tab) {
    console.log(changeInfo);
    // read changeInfo data and store in local storage
    setTimeout(() => {
      if (changeInfo.favIconUrl) {
        // if refreshed
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          // get current tab's id and url
          var activeTab = tabs[0];
          var tabId = activeTab.id;
          if (tabId && activeTab.url) {
            chrome.tabs.sendMessage(tabId, {
              message: 'URL Changed!',
              url: activeTab.url
            })
            value = { url: activeTab.url };
            chrome.storage.local.set({ "dfe": { url: activeTab.url } }, function () {
              console.log('URL is set to ' + activeTab.url);
            });
          }
        });
      }
    }, 1000);
  }
);

chrome.tabs.onActivated.addListener(
  // on click of tab
  function (activeInfo) {
    setTimeout(() => {
      console.log(activeInfo);
      chrome.tabs.get(activeInfo.tabId, function (tab) {
        if (tab.url) {
          chrome.tabs.sendMessage(activeInfo.tabId, {
            message: 'Activated!',
            url: tab.url
          })
          value = { url: tab.url };
          chrome.storage.local.set({ "dfe": { url: tab.url } }, function () {
            console.log('URL is set to ' + tab.url);
          });
        }
      })
    }, 200)
  }
);

chrome.action.onClicked.addListener(
  function () {
    chrome.tabs.sendMessage(tabId, {
      message: 'open'
    });
  }
);