function showDeepfake() {
    var index_url = "deepfake.html";
    chrome.tabs.create({
        url: index_url
    });
}
document.getElementById('button').addEventListener("click", showDeepfake);