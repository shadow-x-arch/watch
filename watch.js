var display = document.getElementById("clock");
var time = null;
var startTime = 0;
var elapsedTime = 0;
var isRunning = false;
function start() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime; // Adjust for paused time
        time = setInterval(update, 10); // Update every 10ms
        isRunning = true;
    }
}
function stop() {
    if (isRunning) {
        if (time !== null) {
            clearInterval(time);
        }
        isRunning = false;
    }
}
function reset() {
    if (time !== null) {
        clearInterval(time);
    }
    isRunning = false;
    startTime = 0;
    elapsedTime = 0;
    if (display) {
        display.textContent = "00:00:00:00"; // Reset to initial state
    }
}
function update() {
    var currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    // Calculate time components
    var hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    var minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    var seconds = Math.floor((elapsedTime / 1000) % 60);
    var milliseconds = Math.floor((elapsedTime % 1000) / 10);
    // Format time components
    var formattedHours = String(hours).padStart(2, "0");
    var formattedMinutes = String(minutes).padStart(2, "0");
    var formattedSeconds = String(seconds).padStart(2, "0");
    var formattedMilliseconds = String(milliseconds).padStart(2, "0");
    // Update display
    if (display) {
        display.textContent = "".concat(formattedHours, ":").concat(formattedMinutes, ":").concat(formattedSeconds, ":").concat(formattedMilliseconds);
    }
}
