result_array = [];
const http = new XMLHttpRequest()

chrome.tabs.query({
		'active': true,
		'windowId': chrome.windows.WINDOW_ID_CURRENT
	},
	function (tabs) {
		document.getElementById("url").innerHTML = (tabs[0].url);

		function buttonClick() {
			document.getElementById("click").innerHTML = "clicked";
		}

		let apiLink = tabs[0].url
		http.open("GET", "https://api.deepware.ai/api/v1/url/scan?video-url=" + apiLink)

		http.setRequestHeader("X-Deepware-Authentication", "067c7e83-0036-4c36-9c98-d2613e42b9e5")

		http.send()
		var fakeDetection = function (fakeDetection) {

			const myJSON = http.responseText;
			http.onload = () => console.log(myJSON)
			console.log(myJSON)
			const reportCheck = JSON.parse(myJSON);
			reportID = reportCheck["report-id"];
			console.log("Report id = " + reportID)
			// sleep time expects milliseconds
			function sleep(time) {
				return new Promise((resolve) => setTimeout(resolve, time));
			}

			// Usage!
			sleep(100).then(() => {
				// Do something after the sleep!
				http.open("GET", "https://api.deepware.ai/api/v1/video/report?report-id=" + reportID)
				http.setRequestHeader("X-Deepware-Authentication", "067c7e83-0036-4c36-9c98-d2613e42b9e5")

				http.onload = function () {
					result_array = JSON.parse(http.responseText);

					displayResult();
				}

				http.send()
				//http.onload = () => console.log(http.responseText)

			});
		}

		function displayResult() {
			console.log(result_array);
			if (result_array.results.deepware.detected == true) {
				document.getElementById("click").innerHTML = "DeepFaked: True";
				chrome.storage.sync.set({
					'DetectedStatus': result_array.results.deepware.detected

				}, function () {
					console.log('Settings saved');
				});
			} else if (result_array.results.deepware.detected == false) {
				document.getElementById("click").innerHTML = "DeepFaked: False";
				chrome.storage.sync.set({
					'DetectedStatus': result_array.results.deepware.detected
				}, function () {
					console.log('Settings saved');
				});
			}
		}

		http.onload = () => fakeDetection()
		//window.open("deepfake.html","_blank", "width=400,height=300,0,status=0")

	}


);