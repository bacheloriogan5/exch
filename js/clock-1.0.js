//
// Copyright 2012 Akram El Assas.
//
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements. See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership. The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License. You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied. See the License for the
// specific language governing permissions and limitations
// under the License.
//

// The strict mode is a new functionality in ECMAScript 5. This mode allows to place a program, 
// or a function, in a 'strict' operating context. This strict operating context prevents certain actions 
// from being taken and throws more exceptions.
'use strict';

//
// Creates a new Clock
//
// Parameters: 
//
// loggingEnabled: By default false. Enables verborse mode, the code execution is traced in the Javascript Browser console. 
//

function Clock(clockParams) {

    //
    //  loggingEnabled By default false. Enables verborse mode, the code execution is traced 
    //  in the Javascript Browser console.
    //
    var loggingEnabled = clockParams && clockParams.enableLogging != undefined ? clockParams.enableLogging : false;

    //
    // logIdentifier
    // Indentifies the clock instance in verbose mode.
    //
    var logIdentifier = 'clock';

    logInformation(logIdentifier, 'HTML5 Digital Clock version 1.0');
    logInformation(logIdentifier, 'Author: Akram El Assas.');
    logSuccess(logIdentifier, 'Clock object successfully created ...');

    // 
    //  Displays the clock with the specified style parameters in the specified container.
    // 
    //  Parameters: 
    //
    // containerId: Required. The id of the DOM object where the clock will be displayed.
    // includeSeconds: Optional. By default false. Displays the seconds.
    // enableAMPMMode: Optional. By default true. Displays the time in AM/PM format.
    // color: Optional. By default 'black'. The color of the clock content.
    // width: Optional. By default 200. The width of the clock.
    // height: Optional. By default 25. The height of the clock.
    // fontSize: Optional. By default 30. The font size of the clock content.
    // fontFamily: Optional. By default 'sans-serif'. The font family of the clock content.
    // timeZone: Optional. By default 'local'. Possible values 'local' or 'utc'. If 'utc' is selected as the value parameter TimeZone, the UTC time will be displayed.
    // addHours: Optional. By default 0. The number of hours to add the time. Is set to 0 By default.
    // substractHours: Optional. By default 0. The number of hours to substract from the time. Is set to 0 By default. 
    // formatTime: Optional. By default true. Indicates whether time hours, minutes, secons have be written in two digits. For example, 1:1:1 will be transformed to 01:01:01. Is set to true By default.
    //
    // Note. If the width and/or height is set, the font size have to be set so that the content fits the desired surface.
    //
    this.display = function(displayParams) {

        if (displayParams) {

            //
            // containerId. The indentifier of the container DOM Object.
            //
            var containerId = displayParams.containerId;

            // Draw the digital clock only If the specified container exists.
            if (containerId) {
                try {

                    //
                    // container. The container DOM Object.
                    //
                    var container = document.getElementById(displayParams.containerId);

                    if (container) {

                        logSuccess(containerId, '[Display] Paramaters initialization starting ...');

                        //
                        // timeZone 
                        // By default the local time is displayed.
                        // Otherwise; If you sepecify 'utc' as the value parameter 
                        // TimeZone, the UTC time will be displayed.
                        //
                        // Availabale values:
                        // timeZone: 'local'  
                        // timeZone: 'utc' 
                        //
                        // Note. If you want to specify an other time zone, just specify
                        // the timeZone as utc and use the parameters addHours or substractHours.
                        //
                        var i = 0;
                        var enumTimeZoneUtc = i++;
                        var enumTimeZoneLocal = i++;

                        var timeZone = displayParams.timeZone && displayParams.timeZone.toLowerCase() == 'utc' ? enumTimeZoneUtc : enumTimeZoneLocal;

                        //
                        // addHours
                        // The number of hours to add the time.
                        // Is set to Zero By default.
                        //
                        var hoursToAdd = displayParams.addHours ? displayParams.addHours : 0;

                        //
                        // substractHours
                        // The number of hours to substract from the time.
                        // Is set to Zero By default.
                        //
                        var hoursToSubstract = displayParams.substractHours ? displayParams.substractHours : 0;

                        //
                        // formatTime
                        // Indicates whether time hours, minutes, secons have be written in 
                        // two digits. For example, 1:1:1 will be transformed to 01:01:01.
                        // Is set to true By default.
                        //
                        var formatTime = displayParams.formatTime != undefined ? displayParams.formatTime : true;

                        // The width parameter is optional.
                        // The value of the width is in pixels.
                        // The default width is 200.
                        var defaultWidth = 200;

                        //
                        // width 
                        // The width of the clock.
                        //
                        var width = displayParams.width ? displayParams.width : defaultWidth;

                        // The height parameter is optional.
                        // The value of the height is in pixels.
                        // The default height is 25.
                        var defaultHeight = 25;

                        //
                        // height 
                        // The height of the clock.
                        //
                        var height = displayParams.height ? displayParams.height : defaultHeight;

                        //
                        // color 
                        // The color of the colock's content. 'black' By default.
                        //
                        var color = displayParams.color ? displayParams.color : 'black';

                        //
                        // isAmpmModeEnabled 
                        // Indicates whether AM/PM mode is enabled or not. By default, enabled.
                        //
                        var isAmpmModeEnabled = displayParams.enableAMPMMode != undefined && displayParams.enableAMPMMode ? true : (displayParams.enableAMPMMode == undefined ? true : false);

                        //
                        // numberOfCanvas 
                        // The number of canvas that contain digits, colons and seconds, AM/PM eventually.
                        // If includeSeconds is false, the number of canvas that contain digits is equal to 3
                        // If includeSeconds is true, the number of canvas that contain digits is equal to 5
                        // If enableAMPMMode is true, the number of canvas that contain digits is equal to 6
                        //
                        var numberOfCanvas = 3;
                        if (displayParams.includeSeconds) numberOfCanvas += 2;
                        if (isAmpmModeEnabled) numberOfCanvas++;

                        //
                        // canvasWidth 
                        // The canvas width.
                        //
                        //
                        var canvasWidth = width / numberOfCanvas;

                        //
                        // canvasHeight
                        // The canvas height.
                        //
                        var canvasHeight = height;

                        //
                        // fontSize 
                        // The font size of the clock's content. By default 20.
                        //
                        var fontSize = displayParams.fontSize ? displayParams.fontSize : 20;

                        //
                        // fontFamily 
                        // The font family of the clock's content. By default 'sans-serif'.
                        //
                        var fontFamily = displayParams.fontFamily ? displayParams.fontFamily : 'sans-serif';

                        //
                        // xcanvas 
                        // Digits canvas X coordinate.
                        //
                        var xcanvas = canvasWidth / 4;

                        //
                        // ycanvas.  
                        // Canvases Y coordinate.
                        //
                        var ycanvas = canvasHeight / 1.3;

                        //
                        // includeSeconds 
                        // Indicates wether the seconds will be displayed or not.
                        // Is set to false By default.
                        //
                        var includeSeconds = displayParams.includeSeconds != undefined && displayParams.includeSeconds ? true : false;

                        //
                        // timerInterval
                        // The interval of the timer is in milliseconds.
                        // The default value is 1 minute = 60 secpnds = 6*1000 milliseconds = 60000 milliseconds.
                        // If the seconds are selected, the value changes to 1 second = 1000 milliseconds.
                        //
                        var timerInterval = includeSeconds ? 1000 : 60000;

                        logSuccess(containerId, '[Display] Paramaters initialization finished ...');

                        // // // // // // // // // // // // // // // // // // // // // // // 
                        //  Pre-render DOM objects
                        // // // // // // // // // // // // // // // // // // // // // // //

                        logSuccess(containerId, '[Display] pre-rendering DOM objects starting ...');

                        //
                        // containerDiv 
                        // The div that will contain the clock.
                        //
                        var containerDiv;

                        // Create the container div element with the width and height,
                        // And append It to the specified container.
                        containerDiv = document.createElement('div');
                        containerDiv.style.width = width + 'px';
                        containerDiv.style.height = height + 'px';
                        container.appendChild(containerDiv);

                        //
                        // hoursCanvas 
                        // The canvas that will contain the hours.
                        //
                        var hoursCanvas;

                        // Create the hours canvas element with the calculated width and height,
                        // And append It to the specified containerDiv.
                        hoursCanvas = createCanvas(canvasWidth, canvasHeight);
                        containerDiv.appendChild(hoursCanvas);

                        //
                        // firstColonCanvas
                        // The canvas that will contain the colon after the hours.
                        //
                        var firstColonCanvas;

                        // Create the colon canvas element with the fixed width and calculated height,
                        // And append It to the specified containerDiv.
                        // Create the hours canvas element with the calculated width and height,
                        // And append It to the specified containerDiv.
                        firstColonCanvas = createCanvas(canvasWidth / 2, canvasHeight);
                        drawCanvas(firstColonCanvas, xcanvas, ycanvas, ':', false);
                        containerDiv.appendChild(firstColonCanvas);

                        //
                        // minutesCanvas
                        // The canvas that will contain the minutes.
                        //
                        var minutesCanvas;

                        // Create the minutes canvas element with the calculated width and height,
                        // And append It to the specified containerDiv.

                        // Create the minutes canvas element with the calculated width and height,
                        // And append It to the specified containerDiv.
                        minutesCanvas = createCanvas(canvasWidth, canvasHeight);
                        containerDiv.appendChild(minutesCanvas);

                        //
                        // secondClonCanvas 
                        // The canvas that will contain the colon after minutes
                        // if the seconds are included.
                        //
                        var secondClonCanvas;

                        var secondsCanvas = undefined;

                        if (includeSeconds) {

                            // Create the colon canvas element with the calculated width and calculated height,
                            // And append It to the specified containerDiv.
                            // Create the hours canvas element with the calculated width and height,
                            // And append It to the specified containerDiv.
                            secondClonCanvas = createCanvas(canvasWidth / 2, canvasHeight);
                            drawCanvas(secondClonCanvas, xcanvas, ycanvas, ':', false);
                            containerDiv.appendChild(secondClonCanvas);

                            // Create the seconds canvas element with the calculated width and height,
                            // And append It to the specified containerDiv.
                            secondsCanvas = createCanvas(canvasWidth, canvasHeight);
                            containerDiv.appendChild(secondsCanvas);
                        }

                        //
                        // ampmCanvas 
                        // The canvas that will contain AM/PM.
                        //
                        var ampmCanvas = undefined;

                        if (isAmpmModeEnabled) {
                            // Create the AM/PM canvas element with the calculated width and calculated height,
                            // And append It to the specified containerDiv.
                            // Create the hours canvas element with the calculated width and height,
                            // And append It to the specified containerDiv.
                            ampmCanvas = createCanvas(canvasWidth, canvasHeight);
                            containerDiv.appendChild(ampmCanvas);
                        }

                        //
                        // memory 
                        // The hidden DOM object where the previous time will be persisted.
                        //
                        var memory;

                        memory = document.createElement('input');
                        memory.type = 'hidden';

                        //
                        // memory.pushJSONData 
                        // Push the JSON text in the hidden field.
                        //
                        memory.pushJSONData = function(jsonTime) {
                            memory.value = jsonTime;
                        };

                        //
                        // memory.pullJSONData 
                        // Pull the JSON text from the hidden field.
                        //
                        memory.pullJSONData = function() {
                            return memory.value;
                        };

                        container.appendChild(memory);

                        logSuccess(containerId, '[Display] pre-rendering DOM objects finished ...');

                        // // // // // // // // // // // // // // // // // // // // // // // 
                        //  Render DOM objects
                        // // // // // // // // // // // // // // // // // // // // // // //

                        logSuccess(containerId, '[Display] rendering DOM objects starting ...');
                        logSuccess(containerId, '[Display] Current time display starting ...');
                        render();
                        setInterval(render, timerInterval);
                        logSuccess(containerId, '[Display] time is beeing displayed ...');

                    } else {
                        logError(containerId, '[Display] containerId referes to an undefined DOM object');
                    }
                } catch(ex) {
                    logError(containerId, '[Display] ' + ex);
                }
            } else {
                logError(containerId, '[Display] containerId parameter is undefined. The containerId parameter is required.');
            }
        } else {
            logError(logIdentifier, '[Display] parameters undefined. The containerId parameter is required.');
        }


        // // // // // // // // // // // // // // // // // // // // // // // // // 
        //  Display Helper functions
        // // // // // // // // // // // // // // // // // // // // // // // // //

        //  
        // render
        // Retrieves the current time and calculate it
        // with the specified timeZone, addHours and 
        // substractHours parameters, and draws it
        // lazily!
        //

        function render() {
            try {

                var now = new Date();
                var hours = undefined;
                var minutes = undefined;
                var seconds = undefined;
                var ampm = undefined;

                //
                // Calculate the hours by timeZone
                //
                switch (timeZone) {
                case enumTimeZoneLocal:
                    hours = now.getHours();
                    minutes = now.getMinutes();
                    if (includeSeconds) seconds = now.getSeconds();
                    break;
                case enumTimeZoneUtc:
                    hours = now.getUTCHours();
                    minutes = now.getUTCMinutes();
                    if (includeSeconds) seconds = now.getUTCSeconds();
                    break;
                }

                if (hours != undefined && minutes != undefined) {
                    //
                    // addHours, substractHours
                    //
                    hours += hoursToAdd;
                    hours -= hoursToSubstract;

                    //
                    // Adjust hours If necessary
                    //
                    if (hours >= 24) hours -= 24 * Math.floor(hours / 24);
                    if (hours <= 0) hours += 24 * Math.floor(hours / 24);

                    //
                    // AM/PM
                    //
                    if (isAmpmModeEnabled) ampm = getAmpmText(hours);
                    if (isAmpmModeEnabled && hours > 12) hours -= 12;

                    //
                    // Draw the canvases lazily!
                    //
                    drawCanvases(hours, minutes, seconds, ampm);

                    //
                    // Push the current time in memory in order to see if the canvases 
                    // have to be re-drawn or not 
                    //
                    var time = includeSeconds
                        ? (isAmpmModeEnabled ?
                            { hours: hours, minutes: minutes, seconds: seconds, mode: ampm } :
                            { hours: hours, minutes: minutes, seconds: seconds }) :
                        (isAmpmModeEnabled ?
                            { hours: hours, minutes: minutes, mode: ampm } :
                            { hours: hours, minutes: minutes });

                    var jsonTime = JSON.stringify(time);
                    memory.pushJSONData(jsonTime);
                } else {
                    logError(containerId, '[doWork] ' + ' minutes and hours are undefined.');
                }

            } catch(e) {
                logError(containerId, '[doWork] ' + e);
            }
        }

        //  
        // getAmpmText
        // Returns 'AM' if the hours are less that 12,
        // otherwise; it returns 'PM'.
        //

        function getAmpmText(hours) {
            try {
                return hours > 12 ? 'PM' : 'AM';
            } catch(e) {
                logError(containerId, '[getAMPMText] ' + e);
            }
            return '';
        }

        //  
        // createCanvas
        // Creates the a new canvas with the specified width
        // and height.
        //

        function createCanvas(w, h) {
            try {
                var canvas = document.createElement('canvas');
                canvas.width = w;
                canvas.height = h;
                return canvas;
            } catch(e) {
                logError(containerId, '[createCanvas] ' + e);
            }
            return undefined;
        }

        //  
        // drawCanvas
        // Draws the specified text in the canvas
        // at the specified x and y coordinates.
        // The clea option clears the canvas before
        // drawing.
        //

        function drawCanvas(canvas, x, y, text, clear) {
            try {
                if (clear == true) canvas.width = canvas.width;
                var canvasContext = canvas.getContext('2d');
                canvasContext.fillStyle = color;
                canvasContext.font = fontSize + 'px' + ' ' + fontFamily;
                canvasContext.fillText(text, x, y);
            } catch(e) {
                logError(containerId, '[drawCanvas] ' + e);
            }
        }

        //  
        // drawCanvases
        // Draws the hours, minutes and seconds in 
        // their corresponding canvas lazily!
        //

        function drawCanvases(hours, minutes, seconds, ampm) {
            try {

                //
                // Get the previous time from memory.
                //
                var previousHours = undefined;
                var previousMinutes = undefined;
                var previousSeconds = undefined;
                var previousMode = undefined;

                if (memory && memory.pullJSONData) {
                    var previousJSonTime = memory.pullJSONData();
                    if (previousJSonTime) {
                        var previousTime = JSON.parse(previousJSonTime);
                        previousHours = previousTime.hours;
                        previousMinutes = previousTime.minutes;
                        previousSeconds = previousTime.seconds;
                        previousMode = previousTime.mode;
                    }
                }

                //
                // Draw the canvases lazily!
                //

                if (hoursCanvas) {
                    if ((previousHours && previousHours < hours)
                        || (previousHours == undefined)) {
                        drawCanvas(hoursCanvas, xcanvas, ycanvas, formatDigits(hours), true);
                        logSuccess(containerId, '[drawCanvases] [hours] previous=' + previousHours
                            + ' current=' + hours);
                        logSuccess(containerId, '[drawCanvases] [hours] canvas drawn');
                    }

                    if (minutesCanvas) {
                        if ((previousMinutes && previousMinutes < minutes)
                            || (previousMinutes == undefined)) {
                            drawCanvas(minutesCanvas, xcanvas, ycanvas, formatDigits(minutes), true);
                            logSuccess(containerId, '[drawCanvases] [minutes] previous=' + previousMinutes
                                + ' current=' + minutes);
                            logSuccess(containerId, '[drawCanvases] [minutes] canvas drawn');
                        }

                        if (ampmCanvas) {
                            if ((previousMode && previousMode != ampm) || (previousMode == undefined)) {
                                drawCanvas(ampmCanvas, xcanvas - 6, ycanvas, ampm, true);
                                logSuccess(containerId, '[drawCanvases] [ampm] previous=' + previousMode
                                    + ' current=' + ampm);
                                logSuccess(containerId, '[drawCanvases] [ampm] canvas drawn');
                            }
                        }

                        if (secondsCanvas) {
                            if ((previousSeconds && previousSeconds < seconds) || (previousSeconds == undefined)) {
                                drawCanvas(secondsCanvas, xcanvas, ycanvas, formatDigits(seconds), true);
                                logSuccess(containerId, '[drawCanvases] [seconds] previous=' + previousSeconds
                                    + ' current=' + seconds);
                                logSuccess(containerId, '[drawCanvases] [seconds] canvas drawn');
                            }
                        }
                    }
                }
            } catch(e) {
                logError(containerId, '[drawCanvases] ' + e);
            }
        }

        //  
        //  formatDigits
        //  Adds a Zero digit If the number has only one digit.
        //  For example, 0 becomes 00.
        //

        function formatDigits(number) {
            try {
                var s = '' + number;
                while (s.length < 2 && formatTime) {
                    s = '0' + s;
                }
                return s;
            } catch(e) {
                logError(containerId, '[formatDigits] ' + e);
            }
            return '';
        }
    };

    //  
    // log
    // Writes en entry in the Javascript Browser console.
    //

    function log(sender, status, message) {
        if (loggingEnabled && sender && status && console.log) console.log(status + '[' + sender + '] ' + message);
    }

    //  
    // logSuccess
    // Writes en success entry in the Javascript Browser console.
    //

    function logSuccess(sender, message) {
        log(sender, '[success] ', message);
    }

    //  
    // logError
    // Writes en error entry in the Javascript Browser console.
    //

    function logError(sender, message) {
        log(sender, '[error] ', message);
    }

    //  
    // logInformation
    // Writes en information entry in the Javascript Browser console.
    //

    function logInformation(sender, message) {
        log(sender, '[information] ', message);
    }
}