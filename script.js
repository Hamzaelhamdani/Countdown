document.addEventListener("DOMContentLoaded", () => {
  const page1 = document.getElementById("page1");
  const page2 = document.getElementById("page2");

  // Timer settings
  const setHoursEl = document.getElementById("set-hours");
  const setMinutesEl = document.getElementById("set-minutes");
  const setSecondsEl = document.getElementById("set-seconds");
  const timerDisplay = {
    hours: document.getElementById("hours"),
    minutes: document.getElementById("minutes"),
    seconds: document.getElementById("seconds"),
  };
  const buttons = document.querySelectorAll(".btn-add, .btn-subtract");
  const setBtn = document.getElementById("set-btn");
  const resetBtn = document.getElementById("reset-btn");

  // Stopwatch controls
  const playPauseBtn = document.getElementById("play-pause-btn");
  const stopBtn = document.getElementById("stop-btn");
  const alarm = document.getElementById("alarm-sound");

  // Timer data
  let timer = { hours: 0, minutes: 0, seconds: 0 };
  let initialTimer = { hours: 0, minutes: 0, seconds: 0 }; // Pour stocker le timer initial
  let countdownInterval;
  let isRunning = false; // Pour vérifier si le chronomètre est en cours d'exécution

  function updateDisplay() {
    timerDisplay.hours.textContent = String(timer.hours).padStart(2, "0");
    timerDisplay.minutes.textContent = String(timer.minutes).padStart(2, "0");
    timerDisplay.seconds.textContent = String(timer.seconds).padStart(2, "0");
  }

  function updateSettingsDisplay() {
    setHoursEl.textContent = String(timer.hours).padStart(2, "0");
    setMinutesEl.textContent = String(timer.minutes).padStart(2, "0");
    setSecondsEl.textContent = String(timer.seconds).padStart(2, "0");
  }

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.target;
      const increment = btn.classList.contains("btn-add") ? 1 : -1;

      if (target === "hours") timer.hours = Math.max(0, timer.hours + increment);
      if (target === "minutes") timer.minutes = Math.min(Math.max(0, timer.minutes + increment), 59);
      if (target === "seconds") timer.seconds = Math.min(Math.max(0, timer.seconds + increment), 59);

      updateSettingsDisplay();
    });
  });

  setBtn.addEventListener("click", () => {
    // Enregistrer le timing initial
    initialTimer = { ...timer };
    updateDisplay();
    page1.classList.remove("active");
    page2.classList.add("active");
  });

  resetBtn.addEventListener("click", () => {
    clearInterval(countdownInterval);
    timer = { ...initialTimer }; // Réinitialiser le timer à l'état initial
    updateSettingsDisplay();
    page2.classList.remove("active");
    page1.classList.add("active");
    alarm.pause(); // Arrêter le son si l'utilisateur réinitialise
    alarm.currentTime = 0; // Remettre le son au début
    playPauseBtn.textContent = "Play"; // Revenir à Play après réinitialisation
    playPauseBtn.classList.remove("paused"); // Retirer l'état "paused"
    isRunning = false; // L'état du chronomètre est maintenant arrêté
  });

  playPauseBtn.addEventListener("click", () => {
    if (isRunning) {
      // Si le chronomètre est en cours d'exécution, il faut le mettre en pause
      clearInterval(countdownInterval);
      playPauseBtn.textContent = "Play"; // Changer le texte en Play
      playPauseBtn.classList.remove("paused"); // Retirer l'état "paused"
    } else {
      // Si le chronomètre est en pause, démarrer le compte à rebours
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
          alarm.play(); // Joue le son d'alarme lorsque le timer atteint zéro
        }
        updateDisplay();
      }, 1000);
      playPauseBtn.textContent = "Pause"; // Changer le texte en Pause
      playPauseBtn.classList.add("paused"); // Ajouter l'état "paused"
    }
    isRunning = !isRunning; // Inverser l'état d'exécution du chronomètre
  });

  stopBtn.addEventListener("click", () => {
    clearInterval(countdownInterval);
    timer = { ...initialTimer }; // Réinitialiser le timer à l'état initial
    updateDisplay();
    alarm.pause(); // Arrêter le son si l'utilisateur appuie sur stop
    alarm.currentTime = 0; // Remettre le son au début
    playPauseBtn.textContent = "Play"; // Revenir à Play après stop
    playPauseBtn.classList.remove("paused"); // Retirer l'état "paused"
    isRunning = false; // L'état du chronomètre est maintenant arrêté
  });
});
