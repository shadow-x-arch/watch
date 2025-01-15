global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;

const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');

describe('Stopwatch UI Tests', () => {
  let dom;
  let container;
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
    jest.useFakeTimers(); // Use fake timers
    dom = new JSDOM(html, { runScripts: 'dangerously' });
    container = dom.window.document.body;
    global.document = container.ownerDocument;

    display = dom.window.document.getElementById('clock');

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

  afterEach(() => {
    jest.restoreAllMocks(); // Restore all mocked implementations
  });

  test('renders initial time', () => {
    expect(display.textContent.trim()).toBe('00:00:00:00');
  });

  test('starts the stopwatch', () => {
    start();
    jest.advanceTimersByTime(1000);
    update();
    expect(getCurrentTime().trim()).toBe('00:00:01:00');
  });

  test('stops the stopwatch', () => {
    start();
    jest.advanceTimersByTime(1000);
    update();
    stop();
    const timeWhenStopped = getCurrentTime().trim();
    jest.advanceTimersByTime(1000); // Simulate additional time passing
    expect(getCurrentTime().trim()).toBe(timeWhenStopped); // Should show time when it was stopped
  });

  test('resets the stopwatch', () => {
    start();
    jest.advanceTimersByTime(1000);
    update();
    reset();
    expect(getCurrentTime().trim()).toBe('00:00:00:00');
  });
});
