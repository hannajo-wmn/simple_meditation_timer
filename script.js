import './component.js'
// Iimport { CustomInput } from './component.js';
import { Timer } from './timer.js';


const newTimeObject = new Timer();
let darkModeOn = false;

// newTimeObject.setDuration()
document.getElementById("custom-input").addEventListener(
    "durationChange", (e) => {
        console.log("durationChange triggered")
        console.log(e.detail + " e.detail")
        newTimeObject.setDuration(e.detail)
    })

// newTimeObject.timer() starts and pauses timer
document.getElementById("start").addEventListener("click", () => {
    console.log("start button works");
    newTimeObject.timer()
    });

// newTimeObject.clearTimer() stops timer if necessary and clears timer
document.getElementById("clear").addEventListener("click", () => newTimeObject.clearTimer());


// Costum "Event Listener" in Timer Object. Communicates remaining time to component for display
newTimeObject.setTimeUpdateCallback((timeLeft) => {
    document.getElementById("custom-input").showTimeLeft(timeLeft)

});

document.getElementById("girl").addEventListener("click", () => {
    if (darkModeOn == false) {
        document.querySelector("body").style.cssText = 'background-color: black';
        document.querySelector("custom-input").style.cssText = 'color: white';
        darkModeOn = true;
    } else {
        document.querySelector("body").style.cssText = 'background-color: white';
        document.querySelector("custom-input").style.cssText = 'color: black';
        darkModeOn = false;
    }
})

