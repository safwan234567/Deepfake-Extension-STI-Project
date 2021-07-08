// When popup is opened, retrieve current url
chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    // listen for messages sent from background.js
    if (request.message === 'open') {
      chrome.storage.local.get(["dfe"], (result) => {
        document.getElementById("url").innerHTML = result.dfe.url;
      });
    }
  }
);