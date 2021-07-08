// Initialize button with user's preferred color
let click = document.getElementById("click");

// When the button is clicked
click.addEventListener("click", async () => {
  chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    let url = tabs[0].url;
    // use `url` here inside the callback because it's asynchronous!
    console.log(url);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == XMLHttpRequest.DONE) {
          console.log(xhr.responseText);
      }
  }
    xhr.open("POST", 'https://api.funtranslations.com/translate/yoda.json', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    console.log(JSON.stringify({
      text: "Hello mum."
  }));
    xhr.send(data=JSON.stringify({
        text: "Hello mum."
    }));
  });
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    // listen for messages sent from background.js
    if (request.message === 'URL Changed!') {
      document.getElementById("url").innerHTML = request.url;
    }
});

// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {
  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.backgroundColor = color;
  });
}
