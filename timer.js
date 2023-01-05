export class Timer {
    constructor() {

        this.interval = null; // stores if timer is running
        this.lastRemainingTime = null; // stores last remainig time when timer is paused
        this.endTime; 
        this.bell = new Audio("/bell.wav");
        this.timeUpdateCallback = null;

    }

    // here the requested meditation time gets in
    setDuration(duration) {
        this.duration = duration;
        this.lastRemainingTime = duration;
    }

    // toggles timer
    timer() {
        console.log(this.interval)
        console.log(this.lastRemainingTime)
        if (this.interval != null) { // in case timer is running
            this.lastRemainingTime = this.endTime - Date.now(); // saves remaining time when paused
            clearInterval(this.interval) //stop running
            this.interval = null; //store: timer is not running anymore
            return // stop here
        }

        this.bell.play();
    
        // determine start time and stop time
        let startTime = Date.now(); // Date.now() milliseconds since 01.01.1970 00:00:00 UTC.
        if (this.lastRemainingTime != null) {
            this.endTime = startTime + this.lastRemainingTime
        } else {
            this.endTime = startTime + this.duration; 
        }
        
    
        // start interval, check every second if counting needs to stop
        this.interval = setInterval(() => {
           let timeLeft = this.endTime - Date.now();

           if ( timeLeft <= 0) {
            clearInterval(this.interval)
            this.bell.play(); // sound at the end of the countdown
            this.interval = null; // update interval variable
            this.lastRemainingTime = null; // lastRemainingTime will be null, when time has ended
            this.timeUpdateCallback(0)
            return
           }

           this.timeUpdateCallback(timeLeft); // this.dispatchEvent(...) ---> f()
        }, 1000); // setInterval(myTimer, 1000) calls a given function every second
    }

    setTimeUpdateCallback(f) { // wird von script.js aus aufgerufen mit Parameter
        this.timeUpdateCallback = f; // (timeLeft) => {document.getElementById("custom-input").showTimeLeft(timeLeft);}
    }

    // clearTimer is called, when "clear" button is clicked
    clearTimer() {
        if (this.interval != null) { //if timer is running
            clearInterval(this.interval); //stop running
        }
        this.interval = null; // update interval variable
        this.lastRemainingTime = null;
        this.timeUpdateCallback(0);
    }
}




