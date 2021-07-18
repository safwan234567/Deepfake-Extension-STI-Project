chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        // listen for messages sent from background.js
        if (request.message) {
            if (request.message == "URL Changed!") {
                while (document.getElementById("dfe")) {
                    document.getElementById("dfe").remove();
                }
            }
            if ((request.message == "Activated!" && !document.getElementById("dfe")) || request.message == "URL Changed!") {
                // if tab is clicked and not already generated OR url changes
                // inject overlay
                if (request.url.startsWith("https://www.youtube.com/watch?v=") || (request.url.startsWith("https://twitter.com/") && request.url.includes("status"))) {
                    fetch(chrome.runtime.getURL('/overlay.html')).then(r => r.text()).then(html => {
                        document.body.insertAdjacentHTML('beforeend', html);
                        // not using innerHTML as it would break js event listeners of the page
                    }).then(() => {
                        //Make the DIV element draggagle:
                        function dragElement(elmnt) {
                            var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
                            if (document.getElementById(elmnt.id + "header")) {
                                /* if present, the header is where you move the DIV from:*/
                                document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
                            } else {
                                /* otherwise, move the DIV from anywhere inside the DIV:*/
                                elmnt.onmousedown = dragMouseDown;
                            }

                            function dragMouseDown(e) {
                                e = e || window.event;
                                e.preventDefault();
                                // get the mouse cursor position at startup:
                                pos3 = e.clientX;
                                pos4 = e.clientY;
                                document.onmouseup = closeDragElement;
                                // call a function whenever the cursor moves:
                                document.onmousemove = elementDrag;
                            }

                            function elementDrag(e) {
                                e = e || window.event;
                                e.preventDefault();
                                // calculate the new cursor position:
                                pos1 = pos3 - e.clientX;
                                pos2 = pos4 - e.clientY;
                                pos3 = e.clientX;
                                pos4 = e.clientY;
                                // set the element's new position:
                                elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
                            }

                            function closeDragElement() {
                                /* stop moving when mouse button is released:*/
                                document.onmouseup = null;
                                document.onmousemove = null;
                            }
                        }
                        dragElement(document.getElementById("dfe"));

                        // insert url into overlay
                        document.getElementById("dfeURL").innerHTML = request.url;
                    }).then(async () => {

                        // scan url
                        const http = new XMLHttpRequest()
                        http.open("GET", "https://api.deepware.ai/api/v1/url/scan?video-url=" + request.url)
                        http.setRequestHeader("X-Deepware-Authentication", "067c7e83-0036-4c36-9c98-d2613e42b9e5")
                        http.send()
                        http.onload = function () {
                            // display report id when retrieved
                            report_id = JSON.parse(http.responseText)["report-id"]
                            document.getElementById("dfeReportId").innerHTML = report_id;
                        }

                        setInterval(() => {
                            // loop get request until report is complete
                            report_id = document.getElementById("dfeReportId").innerHTML;
                            http.open("GET", "https://api.deepware.ai/api/v1/video/report?report-id=" + report_id)
                            http.setRequestHeader("X-Deepware-Authentication", "605c27e4-2aaa-44fc-9353-81ce20e17676")
                            http.send()
                            http.onload = () => {
                                console.log(http.responseText)
                                response = JSON.parse(http.responseText)
                                document.getElementById("dfeStatus").innerHTML = response["completed"];
                                // document.getElementById("dfeResults").innerHTML = response["results"]["deepware"]["score"];
                                if (response["completed"] == true) {
                                    document.getElementById("dfeResults").innerHTML = JSON.stringify(response["results"]);
                                    clearInterval()
                                }
                            }
                        }, 2500);
                    });
                }
            }
        }
    });