chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(request);
        // listen for messages sent from background.js
        if (request.message === 'URL Changed!') {
            if (document.getElementById("dfe")) {
                document.getElementById("dfe").remove();
            }
            if (request.url.startsWith("https://www.youtube.com/watch?v=") || (changeInfo.url.startsWith("https://twitter.com/") && changeInfo.url.includes("status"))) {
                fetch(chrome.runtime.getURL('/overlay.html')).then(r => r.text()).then(html => {
                    document.body.insertAdjacentHTML('beforeend', html);
                    // not using innerHTML as it would break js event listeners of the page
                }).then(() => {
                    //Make the DIV element draggagle:
                    dragElement(document.getElementById("dfe"));

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
                });
            }
        }
    });