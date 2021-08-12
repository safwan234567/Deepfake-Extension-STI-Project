chrome.storage.sync.get(['DetectedStatus'], function (result) {
    console.log('Value currently is ' + result.key);
});