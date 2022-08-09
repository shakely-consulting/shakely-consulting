// @ts-nocheck
(function () {
    'use strict';

    if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
    }
    if (!Element.prototype.closest) {
        Element.prototype.closest = function ( /** @type {string} */ s) {
            var el = this;
            do {
                if (el.matches(s)) return el;
                el = el.parentElement || el.parentNode;
            } while (el !== null && el.nodeType === 1);
            return null;
        };
    }

        // document.addEventListener("load", function(){
        //     var button = document.querySelectorAll("button[id='showcandles']")[0];
        //     document.addEventListener("click", function() {
        //         console.log("clicked");
        //         var candlesbutton = document.getElementById("candles");
        //         if (candlesbutton) {
        //             var aml = document.getElementById("Shakely-Consulting");
        //             if (aml) {
        //                 SC.classList.add("hide");
        //             }
        //             candlesbutton.classList.remove("hide");
        //             SC.plot();
        //         }
        //       });
        // });

    function toggle(sectionId, buttonId) {
        var x = document.getElementById(sectionId);
        let button = document.getElementById(buttonId);
        if (x === undefined) { // Meaning the picture is hidden
            x = document.getElementByClass("hide");
        }
        x.classList.toggle("hide");

        if (document.getElementById(sectionId).classList.length === 0) {
            button.textContent = ("Hide " + buttonId.replace('Button', '') + (buttonId.includes('Price') ? " BTC-USD" : ""));
        }
        else {
            button.textContent = ("Show " + buttonId.replace('Button', '') + (buttonId.includes('Price') ? " BTC-USD" : ""))
        };
    }

    class Log {
        /**
         * @param {string} val
         */
        constructor(val) {

            var console_element = document.getElementById("simple");
            console_element.className = "simple-console";

            var output = document.getElementById("myList");
            output.className = "no-bullets";

            const node = document.createElement("li");
            const textnode = document.createTextNode(val);
            node.appendChild(textnode);
            document.getElementById("myList").appendChild(node);
        }
    }
// <span class="material-symbols-outlined">database</span>
    var FS;
    var Pages = ["showSC", "showsql", "showisitchristmas", "showcandles"];
    var CandlestickPage = document.getElementById("candles");
    var isCandlestickActive = (CandlestickPage && !CandlestickPage.classList.contains("hide")) ? true : false;

    // const doIsCandlesActive = async () => {

    //     var isactive = false;
    //     var candlesdiv = document.getElementById("candles");
    //     if (candlesdiv) {
    //         if (candlesdiv.classList.contains("hide"))
    //             return false;
    //         else {
    //             return true;
    //         }
    //     }
    // }


    //   const isCandlesActive = async () => {

    //     const isactive = await doIsCandlesActive();

    //     if (isactive) {
    //       return true;
    //     }
    //     else {
    //         return false;
    //     }
    //   }

// await isCandlesActive();

    window.SC = {
        colorize: function() {
            var lines = document.querySelectorAll(".view-line");
            if (lines) {
                for (var i = 0; i < lines.length; i++) {
                    var line = lines[i];
                    line.classList.add("blue");
                }
            }
        },
        setActiveDiv: function(activeDivId) {
            document.getElementById("appbar").textContent = activeDivId;
            SC.setAsActive(activeDivId);
            if (activeDivId === "showcandles") {
                SC.plot();
            }
        },
        events: function() {
            document.addEventListener("load", function(){
                var button = document.querySelectorAll("button[id='showcandles']")[0];
                button.addEventListener("click", function() {
                    SC.setAsActive((button.id.replace('show', '')));
                  });
            });
        },
        doIsCandlesActive: async function() {
            var isactive = false;
            var candlesdiv = document.getElementById("candles");
            if (candlesdiv) {
                if (candlesdiv.classList.includes("hide"))
                    return false;
                else {
                    return true;
                }
            }
        },
        isCandlesActive:  async function() {
            var isactive = await SC.doIsCandlesActive();

            if (isactive) {
              return true;
            }
            else {
                return false;
            }
          },
          doisBrowseDataActive: async function() {
            var isactive = false;
            var el =document.querySelectorAll("#queryeditor-tab");

            if (Sql.isNullOrEmpty(el))
                return false;

            if (el) {
                isactive = el[0].ariaSelected;
            }
            if (isactive === "true") {
                return true;
            } else {
                return false;
            }
        },
          isBrowseDataActive: async function() {
            var isactive = await SC.doisBrowseDataActive();

            return isactive;
          },

        resolveAfter2Seconds: function() {
            return new Promise(resolve => {
              setTimeout(() => {
                console.log(typeof resolve(true));
              }, 1000);
            });
          },
        setAsActive: function(activeDivId) {
            var el = document.getElementById(activeDivId);
            if (el && el.id == "candles") {
                if (activeDivId.includes("candles")) {
                    SC.plot();
                }
            }
            if (el) {
                el.classList.add("active");
                var id = el.id.replace("show", "");
                SC.showById(id);
            };

            for (var i = 0; i < Pages.length; i++) {
                if (Pages[i] === activeDivId) {
                    el.classList.remove("hide");
                    continue;
                }
                    var el = document.getElementById(Pages[i]);
                    if (el) {
                        el.classList.remove("active");
                        SC.hideById(el.id.replace("show", ""));
                    }
                };
        },
        addDbLink: function () {
            var els = document.querySelectorAll("a[href='/SqlPage']");
            // els.innerHTML = "database";
            var dblink = document.createElement('span');

            dblink.setAttribute("class", "material-symbols-outlined");
            dblink.innerHTML = "database";
            // dblink.innerHTML = dateString;
            // var li = document.createElement('li');
            // li.appendChild(dblink);
        },
        toggleMenuItems: function(item) {
            var el = [];
            if (item.toLowerCase().includes("sql")) {
            el = document.getElementById("");
            }
            if (el)
            el.classList.toggle('hide');
        },
        openNewWindow: function (url) {
            var windowTarget = "_blank";
            let popup = window.open(url, this.windowTarget, "popup,width=1300,height=900z");
            if (!popup || popup.closed || typeof popup.closed == 'undefined') {
                if (this.mustRedirectOnPopupBlock) {
                    let redirectUrl = window.location.href;
                    let url = action + "?returnUrl=" + encode(redirectUrl);
                    window.location.replace(url);
                }
                else {
                    alert("Authentication popup is blocked by the browser. Please allow popups on this website and retry.")
                }
            }
        },
        getTwitterCookie: function (id) {
            var cookie = document.getElementById(id).contentDocument.cookie;
            console.log(cookie);
        },
        triggerFileDownload: function (fileName, url) {
            const anchorElement = document.createElement('a');
            anchorElement.href = url;
            anchorElement.download = fileName ?? '';

            // anchorElement.click();
            // anchorElement.remove();
        },
        ToggleCancel: function () {
            var x = document.getElementById("cancel");
            x.classList.toggle("hide");
        },
        Toggle: function(elemId) {
            var x = document.getElementById(elemId);
            if (x)
            x.classList.toggle("hide");
        },
        hideById: function(elemId) {
            var x = document.getElementById(elemId);
            if (x && !x.classList.contains("hide"))
            x.classList.toggle("hide");
        },
        showById: function(elemId) {
            var x = document.getElementById(elemId);
            if (x && x.classList.contains("hide"))
            x.classList.remove("hide");
        },
        scrollEventConsolesToTop: function () {
            var myDiv = document.getElementById("event-console");
            myDiv.scrollTop = 0;
        },
        clearGitMessage: function () {
            document.getElementById("gitcommit").value = null;
        },
        doclear: function () {
            document.getElementById("myList").innerHTML = "";
        },
        plot: function ( /** @type {string | URL} */ url) {

            this.webSocketConnected = false;
            this.webSocketHost = "wss://stream.binance.com:9443/ws/" + "BTCUSDT" + "@kline_" + "1";
            if (url == null) url = "https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1d&limit=50";
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("GET", url, true);
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                    var json = JSON.parse(xmlhttp.responseText);
                    SC.candlestickChart = new SC.candleStickChart("candlestick");
                    for (var i = 0; i < json.length; ++i) {
                        SC.addCandlestick(new SC.candleStick(
                            json[i][0], // timestamp
                            json[i][1], // open
                            json[i][4], // close
                            json[i][2], // high
                            json[i][3], // low
                        ));
                    }
                    SC.draw();
                }
            };

            xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xmlhttp.send();
            console.log("Plotted...");
        },
        plot2: function ( /** @type {[]} */ stick) {
            SC.addCandlestick(new SC.candleStick(
                stick[0].timeStamp, // timestamp
                stick[0].open, // open
                stick[0].close, // close
                stick[0].high, // high
                stick[0].low, // low
            ));
            SC.draw2();
        },
        candleStick: function ( /** @type {string} */ timestamp, /** @type {string} */ open, /** @type {string} */ close, /** @type {string} */ high, /** @type {string} */ low) {
            this.timestamp = parseInt(timestamp);
            this.open = parseFloat(open);
            this.close = parseFloat(close);
            this.high = parseFloat(high);
            this.low = parseFloat(low);
            let price = parseFloat(close);

            document.title = "BTC-USD | " + SC.fmt(price);
            // let el = document.querySelector('header');
            // el.setAttribute("width", window.innerWidth - 50 + "px");
        },
        candleStickChart: function ( /** @type {string} */ canvasElementID) {
            SC.canvas = document.getElementById(canvasElementID);
            // var header = document.getElementById("header");

            // header.width = window.innerWidth * 0.9;
            // header.height = window.innerHeight * 0.04;
            // header.style.backgroundColor = "#060d13";
            SC.canvas.width = window.innerWidth * 0.9;
            SC.canvas.height = window.innerHeight * 0.6;

            if (SC.canvas.width) SC.width = parseInt(SC.canvas.width) * 0.99;
            SC.height = parseInt(SC.canvas.height) * 0.99;
            SC.ctx = SC.canvas.getContext("2d");
            // header.ctx = header.getContext("2d");

            SC.canvas.addEventListener("mousemove", ( /** @type {any} */ e) => {
                SC.mouseMove(e);
            });
            SC.canvas.addEventListener("mouseout", ( /** @type {any} */ e) => {
                SC.mouseOut(e);
            });

            addEventListener("resize", ( /** @type {any} */ e) => {
                SC.resize(e);
            });

            // SC.canvas.addEventListener("wheel", ( /** @type {{ preventDefault: () => void; }} */ e) =>
            // {
            //     SC.scroll(e);
            //     e.preventDefault();
            // });

            SC.canvas.style.backgroundColor = "#060d13";
            SC.ctx.font = '12px sans-serif';
            // header.ctx.font = '12px sans-serif';
            SC.gridColor = "#444444";
            SC.gridTextColor = "#aaaaaa";
            SC.mouseHoverBackgroundColor = "#000000";
            SC.mouseHoverTextColor = "#000000";
            SC.greenColor = "#00cc00";
            SC.redColor = "#cc0000";
            SC.greenHoverColor = "#00ff00";
            SC.redHoverColor = "#ff0000";
            SC.candleWidth = 10;
            SC.marginLeft = 10;
            SC.marginRight = 10;
            SC.marginTop = 10;
            SC.marginBottom = 10;
            SC.yStart = 0;
            SC.yEnd = 0;
            SC.yRange = 0;
            SC.yPixelRange = SC.height - SC.marginTop - SC.marginBottom;
            SC.xStart = 0;
            SC.xEnd = 0;
            SC.xRange = 0;
            SC.xPixelRange = (SC.width - SC.marginLeft - SC.marginRight) * 0.87;
            // these are only approximations, the grid will be divided in a way so the numbers are nice
            SC.xGridCells = 25;
            SC.yGridCells = 25;
            SC.b_drawMouseOverlay = false;
            SC.mousePosition = {
                x: 0,
                y: 0
            };
            SC.xMouseHover = 0;
            SC.yMouseHover = 0;
            SC.hoveredCandlestickID = 0;
            // when zooming, just start at a later candlestick in the array
            SC.zoomStartID = 0;
            SC.technicalIndicators = [];
            SC.candlesticks = [];
        },
        resize: function () {
            SC.plot("https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1d&limit=50");
        },
        scroll: function ( /** @type {{ deltaY: number; }} */ e) {
            let url = "https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1d&limit=50";
            let split = url.split('&');
            let newLimit = 0;
            let cnt = 0;
            if (e.deltaY > 0)
                SC.zoomStartID = 1;
            else SC.zoomStartID = -1;

            for (let index = 0; index < split.length; index++) {
                const element = split[index];
                if (!element.includes('limit'))
                    continue;
                else newLimit = parseInt(element.replace('limit=', ''));
            }

            //SC.draw();
        },
        addCandlestick: function ( /** @type {any} */ candlestick) {
            SC.candlesticks.push(candlestick);
        },
        addOneCandlestick: function ( /** @type {any} */ candlestick) {
            SC.candlesticks.push(candlestick);
        },
        mouseMove: function ( /** @type {any} */ e) {
            // document.getElementById("myList").innerHTML = "";
            // document.getElementById('myList').style.color = "white";
            var getMousePos = ( /** @type {{ clientX: number; clientY: number; }} */ e) => {
                var rect = SC.canvas.getBoundingClientRect();
                return {
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top
                };
            };
            SC.mousePosition = getMousePos(e);
            SC.mousePosition.x += SC.candleWidth / 2;
            SC.b_drawMouseOverlay = true;
            if (SC.mousePosition.x < SC.marginLeft) SC.b_drawMouseOverlay = false;
            if (SC.mousePosition.x > SC.width - SC.marginRight + SC.candleWidth) SC.b_drawMouseOverlay = false;
            if (SC.mousePosition.y > SC.height - SC.marginBottom) SC.b_drawMouseOverlay = false;
            if (SC.b_drawMouseOverlay) {
                SC.yMouseHover = SC.yToValueCoords(SC.mousePosition.y);
                SC.xMouseHover = SC.xToValueCoords(SC.mousePosition.x);
                // snap to candlesticks
                var candlestickDelta = SC.candlesticks[1].timestamp - SC.candlesticks[0].timestamp;
                SC.hoveredCandlestickID = Math.floor(
                    (SC.xMouseHover - SC.candlesticks[0].timestamp) / candlestickDelta);
                SC.xMouseHover = Math.floor(SC.xMouseHover / candlestickDelta) * candlestickDelta;
                SC.mousePosition.x = SC.xToPixelCoords(SC.xMouseHover);
                SC.draw();
            } else SC.draw();
        },
        mouseOut: function ( /** @type {any} */ e) {
            SC.b_drawMouseOverlay = false;
            SC.draw();
        },
        draw2: function () {
            SC.calculateYRange();
            SC.calculateXRange();
            SC.drawGrid();
        },
        draw: function () {
            // document.getElementById('candlestick').style.width = "90%";
            SC.ctx.clearRect(0, 0, SC.width, SC.height);
            // header.ctx.clearRect(0, 0, header.width, header.height);
            SC.calculateYRange();
            SC.calculateXRange();
            SC.drawGrid();

            //SC.onInit(SC.candlesticks.reverse()[0]);

            /**
             * This part makes the candles thicker so that they touch
             * vvv
             */
            // SC.candleWidth = SC.xPixelRange / (SC.candlesticks.length - SC.zoomStartID);
            // SC.candleWidth--;
            // if (SC.candleWidth % 2 == 0) SC.candleWidth--;
            /**
             * ^^^
             * This part makes the candles thicker so that they touch
             */
            /**********************   DRAW RED BOXES  **********************/
            for (let i = 0; i < SC.candlesticks.length; ++i) {
                if (SC.candlesticks[i].close > SC.candlesticks[i].open)
                    continue;

                // SC.candleWidth = SC.xPixelRange / (SC.candlesticks.length - SC.zoomStartID);
                // SC.candleWidth--;
                // if (SC.candleWidth % 2 == 0) SC.candleWidth--;

                let color = (SC.candlesticks[i].close > SC.candlesticks[i].open) ? SC.greenColor : SC.redColor;

                if (i == SC.hoveredCandlestickID) {
                    if (color == SC.greenColor) color = SC.greenHoverColor;
                    else if (color == SC.redColor) color = SC.redHoverColor;
                }

                SC.drawLine(SC.xToPixelCoords(SC.candlesticks[i].timestamp), SC.yToPixelCoords(SC.candlesticks[i].low), SC.xToPixelCoords(SC.candlesticks[i].timestamp), SC.yToPixelCoords(SC.candlesticks[i].high), color);
                // draw the candle
                SC.fillRect(SC.xToPixelCoords(SC.candlesticks[i].timestamp) - Math.floor(SC.candleWidth / 2), SC.yToPixelCoords(SC.candlesticks[i].open), SC.candleWidth, SC.yToPixelCoords(SC.candlesticks[i].close) - SC.yToPixelCoords(SC.candlesticks[i].open), color == SC.greenColor ? SC.canvas.style.backgroundColor : SC.redColor);
            }


            for (let i = 0; i < SC.candlesticks.length; ++i) {
                if (SC.candlesticks[i].close > SC.candlesticks[i].open)
                    continue;
                let color = SC.candlesticks[i].close > SC.candlesticks[i].open ? SC.greenColor : SC.redColor;
                if (i == SC.hoveredCandlestickID) {
                    if (color == SC.greenColor) color = SC.greenHoverColor;
                    else if (color == SC.redColor) color = SC.redHoverColor;
                }
                // draw the wick
                SC.drawLine(SC.xToPixelCoords(SC.candlesticks[i].timestamp), SC.yToPixelCoords(SC.candlesticks[i].low), SC.xToPixelCoords(SC.candlesticks[i].timestamp), SC.yToPixelCoords(SC.candlesticks[i].high), color);
                // draw the candle
                SC.fillRect(SC.xToPixelCoords(SC.candlesticks[i].timestamp) - Math.floor(SC.candleWidth / 2), SC.yToPixelCoords(SC.candlesticks[i].open), SC.candleWidth, SC.yToPixelCoords(SC.candlesticks[i].close) - SC.yToPixelCoords(SC.candlesticks[i].open), SC.candlesticks[i].close > SC.candlesticks[i].open ? color : SC.redColor);
            }

            // /**********************   DRAW GREEN BOXES  **********************/

            for (let i = 0; i < SC.candlesticks.length; i++) {
                if (SC.candlesticks[i].close < SC.candlesticks[i].open)
                    continue;

                SC.setGreenStroke(SC.candlesticks[i]);

                let color = SC.candlesticks[i].close > SC.candlesticks[i].open ? SC.greenColor : SC.redColor;
                if (i == SC.hoveredCandlestickID) {
                    if (color == SC.greenColor) color = SC.greenHoverColor;
                    else if (color == SC.redColor) color = SC.redHoverColor;
                }
                SC.ctx.setLineDash([]);
                // draw the wick
                SC.drawLine(SC.xToPixelCoords(SC.candlesticks[i].timestamp), SC.yToPixelCoords(SC.candlesticks[i].low), SC.xToPixelCoords(SC.candlesticks[i].timestamp), SC.yToPixelCoords(SC.candlesticks[i].high), color);
                // draw the candle
                SC.ctx.strokeRect(SC.xToPixelCoords(SC.candlesticks[i].timestamp) - Math.floor(SC.candleWidth / 2), SC.yToPixelCoords(SC.candlesticks[i].open), SC.candleWidth, SC.yToPixelCoords(SC.candlesticks[i].close) - SC.yToPixelCoords(SC.candlesticks[i].open), SC.candlesticks[i].close > SC.candlesticks[i].open ? color : SC.redColor);

                SC.fillRect(SC.xToPixelCoords(SC.candlesticks[i].timestamp) - Math.floor(SC.candleWidth / 2), SC.yToPixelCoords(SC.candlesticks[i].open), SC.candleWidth, SC.yToPixelCoords(SC.candlesticks[i].close) - SC.yToPixelCoords(SC.candlesticks[i].open), SC.canvas.style.backgroundColor);
            }

            //SC.ctx.setLineDash([2, 2]);
            // Draw the horizontal line either green or red based on current price.
            SC.drawLine(0, SC.yToPixelCoords(SC.candlesticks[SC.candlesticks.length - 1].close), SC.width, SC.yToPixelCoords(SC.candlesticks[SC.candlesticks.length - 1].close), SC.candlesticks[SC.candlesticks.length - 1].close > SC.candlesticks[SC.candlesticks.length - 1].open ? SC.greenColor : SC.redColor);

            //this sets the stroke back to normal so all green lines aren't made to look different
            SC.clearStroke();

            SC.ctx.fillStyle = SC.gridTextColor;

            // Adding prices in the top right corner like coinbase has when hovering over.
            let x = SC.canvas.width * 0.6;

            /**
             * HEADER RECTANGLE
             */

            // header.ctx.fillStyle = SC.gridTextColor;

            // header.ctx.fillStyle = SC.gridTextColor;

            // // TODO: getting TypeError: Cannot read properties of undefined (reading 'open') here idk why
            // if (SC.candlesticks.length > 0 && !SC.candlesticks === null)
            //     try {
            //         header.ctx.fillText("O: ", x, 20);
            //         header.ctx.fillText(SC.fmt(SC.candlesticks[SC.hoveredCandlestickID === 0 ? SC.candlesticks.length : SC.hoveredCandlestickID].open), x + 20, 20);

            //         header.ctx.fillText("H: ", x + 95 + 5, 20);
            //         header.ctx.fillText(SC.fmt(SC.candlesticks[SC.hoveredCandlestickID === 0 ? SC.candlesticks.length : SC.hoveredCandlestickID].high), x + 95 + 20, 20);

            //         header.ctx.fillText("L: ", x + (95 * 2) + 5, 20);
            //         header.ctx.fillText(SC.fmt(SC.candlesticks[SC.hoveredCandlestickID === 0 ? SC.candlesticks.length : SC.hoveredCandlestickID].low), x + (95 * 2) + 20, 20);

            //         header.ctx.fillText("C: ", x + (95 * 3) + 5, 20);
            //         header.ctx.fillText(SC.fmt(SC.candlesticks[SC.hoveredCandlestickID === 0 ? SC.candlesticks.length : SC.hoveredCandlestickID].close), x + (95 * 3) + 20, 20);
            //     } catch (error) {
            //         new Log(error);
            //         // new Log(SC.candlesticks.open);
            //     }


            // draw mouse hover
            if (SC.b_drawMouseOverlay) {
                // price line
                SC.ctx.fillStyle = SC.gridTextColor;
                // SC.ctx.setFillColor(138, 147, 159);
                SC.ctx.setLineDash([5, 5]);
                SC.drawLine(0, SC.mousePosition.y, SC.width, SC.mousePosition.y, SC.gridTextColor);
                // time line
                SC.ctx.setLineDash([5, 5]);
                var str = SC.roundPriceValue(SC.yMouseHover);
                var textWidth = SC.ctx.measureText(str).width;
                // fill popup box color
                SC.fillRect(SC.width - 70, SC.mousePosition.y - 10, 70, 20, SC.canvas.style.backgroundColor);
                // draw popup box for price on the far right when hovering over price
                SC.ctx.fillStyle = SC.gridTextColor;
                // fill popup box with price where mouse is hovered
                SC.ctx.fillText(str, SC.width - textWidth - 5, SC.mousePosition.y + 5);

                SC.ctx.setLineDash([5, 5]);
                // draw vertical hover over line
                SC.ctx.fillStyle = SC.gridTextColor;
                SC.drawLine(SC.mousePosition.x, 0, SC.mousePosition.x, SC.height, SC.gridTextColor);
                SC.ctx.setLineDash([]);
                SC.ctx.fillStyle = SC.gridTextColor;
                str = SC.formatDate(new Date(SC.xMouseHover));
                textWidth = SC.ctx.measureText(str).width;
                console.log("textWidth: " + textWidth);
                // fill x axis date box when hovering over
                SC.fillRect(SC.mousePosition.x - textWidth / 2 - 5, SC.height - 20, textWidth + 10, 20, SC.canvas.style.backgroundColor);
                SC.ctx.fillStyle = SC.gridTextColor;
                SC.ctx.fillText(str, SC.mousePosition.x - textWidth / 2, SC.height - 5);
            }

            // var millisecondsToWait = 2000;
            // setTimeout(function () {
            //     SC.plot()
            // }, millisecondsToWait);
        },
        fmt: function (number) {
            return number.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD'
            });
        },
        setGreenStroke: function () {

            SC.ctx.shadowColor = '#00ff00';
            SC.ctx.shadowBlur = 1;
            SC.ctx.lineJoin = 'bevel';
            SC.ctx.lineWidth = 1;
            SC.ctx.strokeStyle = '#38f';
        },
        clearStroke: function () {
            SC.ctx.shadowColor = '';
            SC.ctx.shadowBlur = 0;
            SC.ctx.lineJoin = '';
            SC.ctx.lineWidth = 1;
            SC.ctx.strokeStyle = "";
        },
        onInit: function (candlestickChart) {
            for (var i = 0; i < candlestickChart.candlesticks.length; ++i) {
                // average the number of samples
                var avg = 0;
                var counter = 0;
                for (var j = i; j > i - this.samples && j >= 0; --j) {
                    avg += candlestickChart.candlesticks[j].close;
                    ++counter;
                }
                avg /= counter;
                this.data.push(avg);
            }
        },
        addTechnicalIndicator: function ( /** @type {{ onInit: (arg0: any) => void; }} */ indicator) {
            indicator.onInit(this);
            this.technicalIndicators.push(indicator);
        },
        getCurrentPrice: function () {
            var el = document.getElementById("candleprice");
            if (el != null || el != undefined) return el.textContent;
        },
        setCurrentPrice: function ( /** @type {[]} */ url) {
            SC.plot(url);
        },
        drawGrid: function () {

            // roughly divide the yRange into cells
            var yGridSize = SC.yRange / SC.yGridCells;
            // console.log("yGridSize = " + yGridSize);
            var currentprice = SC.candlesticks[SC.candlesticks.length - 1].close;
            // try to find a nice number to round to
            var niceNumber = Math.pow(10, Math.ceil(Math.log10(yGridSize)));
            if (yGridSize < 0.25 * niceNumber) niceNumber = 0.25 * niceNumber;
            else if (yGridSize < 0.5 * niceNumber) niceNumber = 0.5 * niceNumber;
            // find next largest nice number above yStart
            let yStartRoundNumber = Math.ceil(SC.yStart / niceNumber) * niceNumber;
            // find next lowest nice number below yEnd
            let yEndRoundNumber = Math.floor(SC.yEnd / niceNumber) * niceNumber;
            // DRAWING Y AXIS LABELS
            document.getElementById("candleprice").textContent = "Current Price: " + SC.fmt(currentprice) + " of BTC-USD";
            var currentcolor = SC.candlesticks[SC.candlesticks.length - 1].close > SC.candlesticks[SC.candlesticks.length - 1].open ? SC.greenColor : SC.redColor;
            for (var y = yStartRoundNumber; y <= yEndRoundNumber; y += niceNumber) {
                SC.drawLine(0, SC.yToPixelCoords(y), SC.width, SC.yToPixelCoords(y), SC.gridColor);
                var textWidth = SC.ctx.measureText(SC.roundPriceValue(y)).width;
                // Don't draw y axis value if it would overlap with the current price
                SC.ctx.fillStyle = Math.abs(y - currentprice) < 400 ? SC.canvas.style.backgroundColor : SC.gridTextColor;
                SC.ctx.fillText(SC.roundPriceValue(y), SC.width - textWidth, SC.yToPixelCoords(y));
                SC.ctx.fillStyle = SC.gridTextColor;
                SC.ctx.fillText(SC.roundPriceValue(currentprice), SC.width - textWidth, SC.yToPixelCoords(currentprice));
                SC.ctx.fillStyle = currentcolor;
                SC.ctx.fillText(SC.roundPriceValue(currentprice), SC.width - textWidth, SC.yToPixelCoords(currentprice));
            }
            // roughly divide the xRange into cells
            var xGridSize = SC.xRange / SC.xGridCells;
            // try to find a nice number to round to
            niceNumber = Math.pow(10, Math.ceil(Math.log10(xGridSize)));
            if (xGridSize < 0.25 * niceNumber) niceNumber = 0.25 * niceNumber;
            else if (xGridSize < 0.5 * niceNumber) niceNumber = 0.5 * niceNumber;
            // find next largest nice number above yStart
            var xStartRoundNumber = Math.ceil(SC.xStart / niceNumber) * niceNumber;
            // find next lowest nice number below yEnd
            var xEndRoundNumber = Math.floor(SC.xEnd / niceNumber) * niceNumber;
            // if the total x range is more than 5 days, format the timestamp as date instead of hours
            var b_formatAsDate = false;
            if (SC.xRange > 60 * 60 * 24 * 1000 * 5) b_formatAsDate = true;
            /////////////////////////////////////////////////////////////////////////////////////////////////////
            // DRAWING x AXIS LABELS
            for (var x = xStartRoundNumber; x <= xEndRoundNumber; x += niceNumber) {
                // vertical lines going up from x axis
                SC.drawLine(SC.xToPixelCoords(x), 0, SC.xToPixelCoords(x), SC.height, SC.gridColor);
                var date = new Date(x);
                var dateStr = "";
                if (b_formatAsDate) {
                    var day = date.getDate();
                    var month = date.toLocaleString('default', {
                        month: 'long'
                    }).substring(0, 3);
                    dateStr = month + " " + day;
                } else {
                    dateStr = date.toLocaleTimeString();
                }
                SC.ctx.fillStyle = SC.gridTextColor;
                SC.ctx.fillText(dateStr, SC.xToPixelCoords(x) + 5, SC.height - 25);
            }
        },
        calculateYRange: function () {
            for (var i = 0; i < SC.candlesticks.length; ++i) {
                if (i == 0) {
                    SC.yStart = SC.candlesticks[i].low;
                    SC.yEnd = SC.candlesticks[i].high;
                } else {
                    if (SC.candlesticks[i].low < SC.yStart) {
                        SC.yStart = SC.candlesticks[i].low;
                    }
                    if (SC.candlesticks[i].high > SC.yEnd) {
                        SC.yEnd = SC.candlesticks[i].high;
                    }
                }
            }
            SC.yRange = SC.yEnd - SC.yStart;
        },
        calculateXRange: function () {
            SC.xStart = SC.candlesticks[0].timestamp;
            SC.xEnd = SC.candlesticks[SC.candlesticks.length - 1].timestamp;
            SC.xRange = (SC.xEnd - SC.xStart) * 0.9;
        },
        yToPixelCoords: function ( /** @type {number} */ y) {
            return (SC.height - SC.marginBottom - ((y - SC.yStart) * SC.yPixelRange) / SC.yRange);
        },
        xToPixelCoords: function ( /** @type {number} */ x) {
            return (SC.marginLeft + ((x - SC.xStart) * SC.xPixelRange) / SC.xRange);
        },
        yToValueCoords: function ( /** @type {number} */ y) {
            return (SC.yStart + ((SC.height - SC.marginBottom - y) * SC.yRange) / SC.yPixelRange);
        },
        xToValueCoords: function ( /** @type {number} */ x) {
            return (SC.xStart + ((x - SC.marginLeft) * SC.xRange) / SC.xPixelRange);
        },
        drawLine: function ( /** @type {number} */ xStart, /** @type {number} */ yStart, /** @type {number} */ xEnd, /** @type {number} */ yEnd, /** @type {any} */ color) {
            SC.ctx.beginPath();
            // to get a crisp 1 pixel wide line, we need to add 0.5 to the coords
            SC.ctx.moveTo(xStart + 0.5, yStart + 0.5);
            SC.ctx.lineTo(xEnd + 0.5, yEnd + 0.5);
            SC.ctx.strokeStyle = color;
            SC.ctx.stroke();
        },
        fillRect: function ( /** @type {any} */ x, /** @type {any} */ y, /** @type {any} */ width, /** @type {any} */ height, /** @type {any} */ color) {
            SC.ctx.beginPath();
            SC.ctx.fillStyle = color;
            SC.ctx.rect(x, y, width, height);
            SC.ctx.fill();
        },
        drawRect: function ( /** @type {any} */ x, /** @type {any} */ y, /** @type {any} */ width, /** @type {any} */ height, /** @type {any} */ color) {
            SC.ctx.beginPath();
            SC.ctx.strokeStyle = color;
            SC.ctx.rect(x, y, width, height);
            SC.ctx.stroke();
        },
        updateCandlestick: function ( /** @type {number} */ candlestickID, /** @type {any} */ open, /** @type {any} */ close, /** @type {any} */ high, /** @type {any} */ low) {
            if (candlestickID >= 0 && candlestickID < this.candlesticks.length) {
                this.candlesticks[candlestickID].update(open, close, high, low);
                for (var i = 0; i < this.technicalIndicators.length; ++i) {
                    this.technicalIndicators[i].onUpdateCandlestick(this, candlestickID);
                }
            }
        },
        MovingAverage: function ( /** @type {any} */ samples, /** @type {any} */ color, /** @type {any} */ lineWidth) {
            this.samples = samples;
            this.color = color;
            this.lineWidth = lineWidth;
            this.data = [];
        },
        onAddCandlestick: function ( /** @type {{ candlesticks: { [x: string]: { close: number; }; }; }} */ candlestickChart, /** @type {number} */ candlestickID) {
            // average the number of samples
            var avg = 0;
            var counter = 0;
            for (var i = candlestickID; i > candlestickID - this.samples && i >= 0; --i) {
                avg += candlestickChart.candlesticks[i].close;
                ++counter;
            }
            avg /= counter;
            this.data.push(avg);
        },
        onUpdateCandlestick: function ( /** @type {{ candlesticks: { [x: string]: { close: number; }; }; }} */ candlestickChart, /** @type {number} */ candlestickID) {
            // average the number of samples
            var avg = 0;
            var counter = 0;
            for (var i = candlestickID; i > candlestickID - this.samples && i >= 0; --i) {
                avg += candlestickChart.candlesticks[i].close;
                ++counter;
            }
            avg /= counter;
            this.data[candlestickID] = avg;
        },
        MovingAverageDraw: function ( /** @type {{ context: { lineWidth: any; }; zoomStartID: any; drawLine: (arg0: any, arg1: any, arg2: any, arg3: any, arg4: any) => void; xToPixelCoords: (arg0: any) => any; candlesticks: { [x: string]: { timestamp: any; }; }; yToPixelCoords: (arg0: any) => any; }} */ candlestickChart) {
            var oldLineWidth = candlestickChart.context.lineWidth;
            candlestickChart.context.lineWidth = this.lineWidth;
            for (var i = candlestickChart.zoomStartID; i < this.data.length - 1; ++i) {
                candlestickChart.drawLine(candlestickChart.xToPixelCoords(candlestickChart.candlesticks[i].timestamp), candlestickChart.yToPixelCoords(this.data[i]), candlestickChart.xToPixelCoords(candlestickChart.candlesticks[i + 1].timestamp), candlestickChart.yToPixelCoords(this.data[i + 1]), this.color);
            }
            candlestickChart.context.lineWidth = oldLineWidth;
        },
        formatDate: function ( /** @type {{ getDate: () => any; getMonth: () => number; getHours: () => any; getMinutes: () => any; getFullYear: () => string; }} */ date) {
            SC.ctx.fillStyle = SC.gridTextColor;
            var day = date.getDate();
            var month = date.getMonth() + 1;
            var hours = date.getHours();
            var minutes = date.getMinutes();
            if (minutes < 10) minutes = "0" + minutes;
            return (month + "/" + day + "/" + date.getFullYear() + " - " + hours + ":" + minutes);
        },
        roundPriceValue: function ( /** @type {number} */ value) {
            if (value > 1.0) return ((Math.round(value * 100) / 100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,"));
            if (value > 0.001) return (Math.round(value * 1000) / 1000).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
            if (value > 0.00001) return (Math.round(value * 100000) / 100000).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            if (value > 0.0000001) return (Math.round(value * 10000000) / 10000000).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            else return (Math.round(value * 1000000000) / 1000000000).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        },
        setCanvasSize: function () {
            if (document.getElementById("candlestick") && document.getElementById("candlestick").style.width != "1600") document.getElementById("candlestick").style.width = window.innerWidth * 0.95;
        },
        updateTitle: function () {
            // new Log(SC.getCurrentPrice());
            document.title = SC.getCurrentPrice();
        },
        mountAndInitializeDb: function() {
            try {
                window.Module.FS.mkdir('/database');
                window.Module.FS.mount(window.Module.FS.IDBFS, {}, '/database');
                return SC.syncDatabase(true);
            }
            catch (error) {
                console.log(error);
            }
        },
        syncDatabase: function(populate) {
            try {
            return new Promise((resolve, reject) => {
                window.Module.FS.syncfs(populate, (err) => {
                    if (err) {
                        console.log('syncfs failed. Error:', err);
                        reject(err);
                    }
                    else {
                        console.log('synced successfull.');
                        resolve();
                    }
                });
            });
            }
            catch (error) {
                console.log('failed to sync database.');
            }
        },
        logit: function(message) {
            console.log(message);
        }
    };
}());
