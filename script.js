let timerInterval;
let totalTime = 0;

// Get references to elements
const hoursElem = document.getElementById('hours');
const minutesElem = document.getElementById('minutes');
const secondsElem = document.getElementById('seconds');
const setHours = document.getElementById('set-hours');
const setMinutes = document.getElementById('set-minutes');
const setSeconds = document.getElementById('set-seconds');
const alarmSound = document.getElementById('alarm-sound');

// Set Timer
document.getElementById('set-btn').addEventListener('click', () => {
    const hours = parseInt(setHours.value) || 0;
    const minutes = parseInt(setMinutes.value) || 0;
    const seconds = parseInt(setSeconds.value) || 0;

    totalTime = hours * 3600 + minutes * 60 + seconds;

    displayTime(totalTime);
});

// Start Timer
document.getElementById('start-btn').addEventListener('click', () => {
    if (totalTime > 0 && !timerInterval) {
        timerInterval = setInterval(() => {
            totalTime--;
            displayTime(totalTime);

            if (totalTime <= 0) {
                clearInterval(timerInterval);
                timerInterval = null;
                alarmSound.play();
            }
        }, 1000);
    }
});

// Pause Timer
document.getElementById('pause-btn').addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = null;
});

// Stop Timer
document.getElementById('stop-btn').addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = null;
    totalTime = 0;
    displayTime(totalTime);
});

// Clear Inputs
document.getElementById('clear-btn').addEventListener('click', () => {
    setHours.value = '';
    setMinutes.value = '';
    setSeconds.value = '';
});

// Update Display
function displayTime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    hoursElem.textContent = String(hrs).padStart(2, '0');
    minutesElem.textContent = String(mins).padStart(2, '0');
    secondsElem.textContent = String(secs).padStart(2, '0');
}
