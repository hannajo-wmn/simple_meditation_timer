let interval = null; // stores if timer ist running
let lastRemainingTime = null; // stores last remainig time when timer is paused
let endTime; 

let inputElement = document.getElementById("userInput") //user input html element
let timeElement = document.getElementById("timer") //timer div

/* timer is called, when user clicks start/pause */
function timer() {
    if (interval != null) { // in case timer is running
        lastRemainingTime = endTime - Date.now();
        clearInterval(interval) //stop running
        interval = null; //store that timer is not running anymore
        return // stop here
    }

    // convert user input (given in minutes:seconds) to milliseconds (requestedMilliseconds)
    let requestedMilliseconds;
    if (lastRemainingTime != null) {
        requestedMilliseconds = lastRemainingTime
    }
    else if (inputElement.value.length <= 2) {
        requestedMilliseconds = inputElement.value * 1000;
    }
    else if (inputElement.value.length >= 3) {
        let timestring = inputElement.value.padStart(4, "0")
        requestedMilliseconds = timestring.substring(0, 2) * 60 * 1000 + timestring.substring(2, 4) * 1000;
    }
    
    // determine start time and stop time
    let startTime = Date.now(); // Date.now() milliseconds since 01.01.1970 00:00:00 UTC.
    endTime = startTime + requestedMilliseconds;

    // start interval, check every second if counting needs to stop
    interval = setInterval(function() {
       let timeLeft = endTime - Date.now();
       let minutes = Math.floor(timeLeft / (1000 * 60));
       let seconds = Math.floor((timeLeft/1000) % 60);
       if ((minutes <= 0) && (seconds <= 0)) {
        minutes = 0;
        seconds = 0;
        clearInterval(interval)
       }
       let text = String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
       document.getElementById("timer").innerHTML = text;
    }, 1000); // setInterval(myTimer, 1000) calls a given function every second
  }


// formats user input like this '00:00'
function formatInputValue() {
    if (inputElement.value.length <= 2) {
        return "00:" + inputElement.value.padStart(2, "0")
    }
    else if (inputElement.value.length >= 3) {
        let timestring = inputElement.value.padStart(4, "0")
        timestring = timestring.substring(0, 2) + ":" + timestring.substring(2, 4);
        return timestring;
    }

}

// clearTimer is called, when "clear" button is clicked
function clearTimer() {
    if (interval != null) { //if timer is running
        clearInterval(interval); //stop running
    }
    interval = null; // update interval variable
    timeElement.innerHTML = '00:00';
    inputElement.value = '';
    lastRemainingTime = null;
}

// show formated user input in timeElement
inputElement.addEventListener("input", () => {
    timeElement.innerHTML = formatInputValue();
});

document.getElementById("start").addEventListener("click", timer);
document.getElementById("clear").addEventListener("click", clearTimer);

