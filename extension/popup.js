const http = new XMLHttpRequest()

chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
   function(tabs){
      document.write(tabs[0].url);
	  let apiLink = tabs[0].url
	  http.open("GET", "https://api.deepware.ai/api/v1/url/scan?video-url=" + apiLink)

		http.setRequestHeader("X-Deepware-Authentication", "067c7e83-0036-4c36-9c98-d2613e42b9e5")            

		http.send()

		http.onload = () => console.log(http.responseText)
		
   }

   
);


