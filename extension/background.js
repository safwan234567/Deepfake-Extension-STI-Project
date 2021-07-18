chrome.tabs.onUpdated.addListener(
  function (tabId, changeInfo, tab) {
    console.log(changeInfo);
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
              // set url in local storage
              // value = { url: activeTab.url };
              // chrome.storage.local.set({ "dfe": { url: activeTab.url } }, function () {
              //   console.log('URL is set to ' + activeTab.url);
              // });
            }
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

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   const http = new XMLHttpRequest()
//   http.open("GET", request.input)
//   http.setRequestHeader("X-Deepware-Authentication", "067c7e83-0036-4c36-9c98-d2613e42b9e5")
//   http.send()
//   http.onload = () => response = http.responseText;
//   console.log(response);
//   response.text().then(function (text) {
//     sendResponse([{
//       body: text,
//       status: response.status,
//       statusText: response.statusText,
//     }, null]);
//   });
//   return true;
// });

chrome.action.onClicked.addListener(
  function () {
    chrome.tabs.sendMessage(tabId, {
      message: 'open'
    });
  }
);