const template = document.createElement('template');
template.innerHTML = `
<style>

    #first {
        height: 10px;
    }

    #timer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    input {
        height: 0px;
        border: 0px;
        opacity: 0;
    }
    .timer {
        font-size: 3rem;
        /* color: black; */
    }
</style>
<div class="custom-input" id="first">
    <input id="userInput" type="number" value="" max="9999" />
</div>
<div class="timer" id="timer">00:00</div>
`;


export class CustomInput extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' }); // ShadowDOM ersetzt normales DOM als Bezugsrahmen
        this.shadowRoot.append(template.content.cloneNode(true));
        this.inputElement = this.shadowRoot.querySelector("input")
        
    }

    // formats user input for display, for example "01:30"
    formatInputValue(inputValue) {
        let timetext;

        console.log(inputValue, inputValue.length)

        if (inputValue.length <= 2) {
            timetext = "00:" + inputValue.padStart(2, "0")
            console.log(timetext)
            return timetext
        }
        else if (inputValue.length >= 3) {
            timetext = inputValue.padStart(4, "0")
            timetext = timetext.substring(0, 2) + ":" + timetext.substring(2, 4);
            console.log(timetext)
            return timetext;
        }
    }

    convertUserInput(timestring) {
    // convert user input (given in minutes:seconds) to milliseconds because the Timer Object needs this for calculating
        if (timestring.length <= 2) {
            return timestring * 1000;
        }
        else if (timestring.length >= 3) {
                timestring = timestring.padStart(4, "0");
                return timestring.substring(0, 2) * 60 * 1000 + timestring.substring(2, 4) * 1000;
        }    
    }
    

    showTimeLeft(timeLeft){
    // you get timeLeft from timer object in milliseconds, need to convert back to human readable display

        if (timeLeft <= 0) {
            this.inputElement.value = ''
        }

        let fixedTime;
        console.log(timeLeft, " timeLeft in millieseconds")
        let minutes = Math.floor(timeLeft / (1000 * 60));
        let seconds = Math.floor(((timeLeft/1000) + .5) % 60); // + .5 prevents counterintuitive time display when timer is off by 1 millisecond
        fixedTime = String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
        this.timer.innerHTML = fixedTime
    }


    connectedCallback() {
        this.timer = this.shadowRoot.getElementById("timer")

        this.inputElement.addEventListener("input", () => {
            // restriction: 60 minutes max
            if (this.inputElement.value >= 6000) {
                this.timer.innerHTML = "60:00"
                this.dispatchEvent(new CustomEvent("durationChange", { detail: this.convertUserInput("6000")}));
            } else {
                this.timer.innerHTML = this.formatInputValue(this.inputElement.value);
                this.dispatchEvent(new CustomEvent("durationChange", { detail: this.convertUserInput(this.inputElement.value)}));
            }
        })

        this.timer.addEventListener("click", () => {
            this.inputElement.focus();
          });
    }
}

window.customElements.define('custom-input', CustomInput);
