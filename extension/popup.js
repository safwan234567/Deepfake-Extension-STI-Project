const checkbox = document.getElementById("switch")

// check sync storage for on/off
chrome.storage.sync.get("dfe", function (obj) {
	if (obj["dfe"]["on"] == true) {
		//display state in popup
		checkbox.checked = true;
		document.getElementById("status").innerHTML = "ON";
		document.getElementById("status").style.color = "green";
	}
})

//when toggled in popup, edit sync storage
checkbox.addEventListener('change', (event) => {
	if (event.currentTarget.checked) {
		// turn extension on in sync storage
		value = { on: true }
		chrome.storage.sync.set({ "dfe": value }, function () {
			document.getElementById("status").innerHTML = "ON";
			document.getElementById("status").style.color = "green";
		});
	} else {
		// turn extension off in sync storage
		value = { on: false }
		chrome.storage.sync.set({ "dfe": value }, function () {
			document.getElementById("status").innerHTML = "OFF";
			document.getElementById("status").style.color = "red";
		});
	}
})