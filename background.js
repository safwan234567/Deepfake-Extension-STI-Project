chrome.tabs.onUpdated.addListener(
  function (tabId, changeInfo, tab) {
    chrome.storage.sync.get("dfe", function (obj) {
      if (obj['dfe']['on'] == true) {
        setTimeout(() => {
          if (changeInfo.favIconUrl) {
            // if page is updated (url change or reload)
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
              // get current tab's id and url
              var activeTab = tabs[0];
              var tabId = activeTab.id;
              if (tabId && activeTab.url) {
                if (activeTab.url.startsWith("https://www.youtube.com/watch?v=") || (activeTab.url.startsWith("https://twitter.com/") && activeTab.url.includes("status"))) {
                  // if youtube or twitter video
                  chrome.tabs.sendMessage(tabId, {
                    message: 'URL Changed!',
                    url: activeTab.url
                  })
                }
              }
            });
          }
        }, 1000);
      }
    });
  }
);

chrome.tabs.onActivated.addListener(
  // on click of tab
  function (activeInfo) {
    chrome.storage.sync.get("dfe", function (obj) {
      if (obj['dfe']['on'] == true) {
        setTimeout(() => {
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
    });
  }
);