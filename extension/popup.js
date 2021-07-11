const http = new XMLHttpRequest()

chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
   function(tabs){
      document.write(tabs[0].url);
	  let apiLink = tabs[0].url
	  http.open("GET", "https://api.deepware.ai/api/v1/url/scan?video-url=" + apiLink)

		http.setRequestHeader("X-Deepware-Authentication", "067c7e83-0036-4c36-9c98-d2613e42b9e5")            

		http.send()
		var fakeDetection = function(fakeDetection){
		
		const myJSON = http.responseText;
		http.onload = () => console.log(myJSON)
		console.log(myJSON)
		const reportCheck = JSON.parse(myJSON);
		reportID = reportCheck["report-id"];
		console.log("Report id = " + reportID)
		// sleep time expects milliseconds
		function sleep (time) {
		return new Promise((resolve) => setTimeout(resolve, time));
		}

	// Usage!
		sleep(50).then(() => {
			// Do something after the sleep!
			http.open("GET", "https://api.deepware.ai/api/v1/video/report?report-id=" + reportID)
			http.setRequestHeader("X-Deepware-Authentication", "067c7e83-0036-4c36-9c98-d2613e42b9e5")            

			http.send()

			http.onload = () => console.log(http.responseText)
		});
		}
			
		http.onload = () => fakeDetection()
		
   }

   
);



