document.addEventListener("DOMContentLoaded", () => {
  const alarmSound = document.getElementById("alarm-sound");

  let timer = {
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  let countdownInterval;
  let isPaused = false;

  // DOM Elements
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');
  const setHours = document.getElementById('set-hours');
  const setMinutes = document.getElementById('set-minutes');
  const setSeconds = document.getElementById('set-seconds');
  const setBtn = document.getElementById('set-btn');
  const startBtn = document.getElementById('start-btn');
  const pauseBtn = document.getElementById('pause-btn');
  const clearBtn = document.getElementById('clear-btn');
  const stopBtn = document.getElementById('stop-btn');
  const playBtn = document.getElementById('play-btn'); // Ajoutez ce bouton dans votre HTML.

  pauseBtn.hidden = true;
  playBtn.hidden = true;

  // Update the display
  function updateDisplay() {
    hoursEl.textContent = String(timer.hours).padStart(2, '0');
    minutesEl.textContent = String(timer.minutes).padStart(2, '0');
    secondsEl.textContent = String(timer.seconds).padStart(2, '0');
  }

  // Start Countdown
  function startCountdown() {
    countdownInterval = setInterval(() => {
      if (timer.seconds > 0) {
        timer.seconds--;
      } else if (timer.minutes > 0) {
        timer.minutes--;
        timer.seconds = 59;
      } else if (timer.hours > 0) {
        timer.hours--;
        timer.minutes = 59;
        timer.seconds = 59;
      } else {
        clearInterval(countdownInterval);
        countdownInterval = null;
        alarmSound.play().catch(error => console.error("Erreur lors de la lecture du son :", error));
        alert("Time's up!");
      }
      updateDisplay();
    }, 1000);
  }

  // Set Timer
  setBtn.addEventListener('click', () => {
    timer.hours = parseInt(setHours.value) || 0;
    timer.minutes = parseInt(setMinutes.value) || 0;
    timer.seconds = parseInt(setSeconds.value) || 0;
    updateDisplay();
  });

  // Start Button
  startBtn.addEventListener('click', () => {
    if (!countdownInterval) {
      startCountdown();
      startBtn.hidden = true;
      pauseBtn.hidden = false;
    }
  });

  // Pause Button
  pauseBtn.addEventListener('click', () => {
    if (countdownInterval) {
      clearInterval(countdownInterval);
      countdownInterval = null;
      isPaused = true;
      pauseBtn.hidden = true;
      playBtn.hidden = false;
    }
  });

  // Play Button
  playBtn.addEventListener('click', () => {
    if (isPaused) {
      isPaused = false;
      playBtn.hidden = true;
      pauseBtn.hidden = false;
      startCountdown();
    }
  });

  // Clear Button
  clearBtn.addEventListener('click', () => {
    clearInterval(countdownInterval);
    countdownInterval = null;
    timer.hours = 0;
    timer.minutes = 0;
    timer.seconds = 0;
    isPaused = false;
    startBtn.hidden = false;
    pauseBtn.hidden = true;
    playBtn.hidden = true;
    updateDisplay();
  });

  // Stop Button
  stopBtn.addEventListener('click', () => {
    if (!alarmSound.paused) {
      alarmSound.pause();
      alarmSound.currentTime = 0;
    }
    clearInterval(countdownInterval);
    countdownInterval = null;
    isPaused = false;
  });
});
