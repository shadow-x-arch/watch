const display = document.getElementById("clock");
let time = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;

function start() {

  if (!isRunning) {
    startTime = Date.now() - elapsedTime; 
    time = setInterval(update, 10); 
    isRunning = true;
  }
}

function stop() {

  if (isRunning) {
    clearInterval(time);
    isRunning = false;
  }
}

function reset() {
  
  clearInterval(time);
  isRunning = false;
  startTime = 0;
  elapsedTime = 0;
  display.textContent = "00:00:00:00"; 
}

function update() {
  const currentTime = Date.now();
  elapsedTime = currentTime - startTime;


  const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
  const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
  const seconds = Math.floor((elapsedTime / 1000) % 60);
  const milliseconds = Math.floor((elapsedTime % 1000) / 10);


  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");
  const formattedMilliseconds = String(milliseconds).padStart(2, "0");

 
  display.textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
}
