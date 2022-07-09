function timer() {
    let startTime = Date.now();
    let fiveMinutes = 1000 * 60 * 5;
    let endTime = startTime + fiveMinutes;

    let interval = setInterval(function() {
       let elapsedTime = Date.now() - startTime;
       let timeLeft = endTime - Date.now();
       let minutes = Math.floor(timeLeft / (1000 * 60));
       let seconds = Math.floor((timeLeft/1000) % 60);
       let text = '0' + minutes + ':' + seconds;
       document.getElementById("timer").innerHTML = text;
    }, 1000);
  }



/* function testButton() {
    let timer = document.getElementById("timer");
    timer.innerText = 'Klick!';
    alert('Event Listener funktioniert!');
} */


/* function startTimer() {
    let startTime = new Date().getTime();
    let fiveMinutes = 1000 * 60 * 5;
    let endTime = startTime + fiveMinutes;

    setInterval(function() {
        let timeLeft = endTime - new Date().getTime();
        let minutes = timeLeft / (1000 * 60);
        minutes = Math.floor(minutes)
        let seconds = (timeLeft / 1000) % 60;
        seconds = Math.round(seconds);
        let text = '0' + minutes + ' : ' + seconds;
        document.getElementById("timer").innerHTML = text;
    }, 1000);
}*/

document.getElementById("start").addEventListener("click", timer);


/* document.getElementById("start").addEventListener("click", testButton); */