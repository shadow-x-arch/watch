global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;

const { JSDOM } = require('jsdom');

describe('Stopwatch Unit Tests', () => {
  let display;
  let start;
  let stop;
  let reset;
  let update;
  let time;
  let startTime;
  let elapsedTime;
  let isRunning;

  beforeEach(() => {
    const dom = new JSDOM(`<!DOCTYPE html><html><body>
      <div id="clock">00:00:00:00</div>
    </body></html>`);
    global.document = dom.window.document;

    display = document.getElementById("clock");

    // Initialize variables
    time = null;
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;

    start = () => {
      if (!isRunning) {
        startTime = Date.now() - elapsedTime; 
        time = setInterval(update, 10); 
        isRunning = true;
      }
    };

    stop = () => {
      if (isRunning) {
        clearInterval(time);
        isRunning = false;
      }
    };

    reset = () => {
      clearInterval(time);
      isRunning = false;
      startTime = 0;
      elapsedTime = 0;
      display.textContent = "00:00:00:00"; 
    };

    update = () => {
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
    };

    getCurrentTime = () => display.textContent;
  });

  test('starts the stopwatch', () => {
    jest.useFakeTimers();
    start();
    jest.advanceTimersByTime(1000);
    update();
    expect(getCurrentTime()).toBe('00:00:01:00');
  });

  test('stops the stopwatch', () => {
    jest.useFakeTimers();
    start();
    jest.advanceTimersByTime(1000);
    update();
    stop();
    const timeWhenStopped = getCurrentTime();
    console.log('Time when stopped:', timeWhenStopped); // Log the time when stopped
    jest.advanceTimersByTime(1000); // Simulate additional time passing without updating
    console.log('Time after stopping and advancing timers:', getCurrentTime()); // Log the time after stopping
    expect(getCurrentTime()).toBe(timeWhenStopped); // Should show time when it was stopped
  });

  test('resets the stopwatch', () => {
    jest.useFakeTimers();
    start();
    jest.advanceTimersByTime(1000);
    reset();
    expect(getCurrentTime()).toBe('00:00:00:00');
  });
});
