const display = document.getElementById("clock") as HTMLElement | null;
let time: number | null = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;

function start(): void {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime; // Adjust for paused time
    time = setInterval(update, 10); // Update every 10ms
    isRunning = true;
  }
}

function stop(): void {
  if (isRunning) {
    if (time !== null) {
      clearInterval(time);
    }
    isRunning = false;
  }
}

function reset(): void {
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

function update(): void {
  const currentTime = Date.now();
  elapsedTime = currentTime - startTime;

  // Calculate time components
  const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
  const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
  const seconds = Math.floor((elapsedTime / 1000) % 60);
  const milliseconds = Math.floor((elapsedTime % 1000) / 10);

  // Format time components
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");
  const formattedMilliseconds = String(milliseconds).padStart(2, "0");

  // Update display
  if (display) {
    display.textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
  }
}
