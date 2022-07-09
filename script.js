function timer() {
    let startTime = Date.now(); //Die Methode Date.now() ermittelt die Anzahl der Millisekunden, die seit dem 01.01.1970 00:00:00 UTC vergangen sind.
    let fiveMinutes = 1000 * 60 * 1; // Zeit, die der Timer laufen soll
    let endTime = startTime + fiveMinutes;

    let interval = setInterval(function() {
       let elapsedTime = Date.now() - startTime;
       let timeLeft = endTime - Date.now();
       let minutes = Math.floor(timeLeft / (1000 * 60));
       let seconds = Math.floor((timeLeft/1000) % 60);
       if ((minutes === 0) && (seconds === 0)) {
        clearInterval(interval)
       }
       let text = '0' + minutes + ':' + seconds;
       document.getElementById("timer").innerHTML = text;
    }, 1000); // setInterval(myTimer, 1000); ruft eine Funktion jede Sekunde auf
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