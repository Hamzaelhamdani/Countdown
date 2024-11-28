/*
document.addEventListener("DOMContentLoaded", () => {
    const alarmSound = document.getElementById("alarm-sound");
    if (!alarmSound) {
      console.error("Fichier audio introuvable dans le DOM !");
      return;
    }

    console.log("Fichier audio trouvé :", alarmSound.src);
  
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
    const playBtn = document.getElementById('play-btn');

    // Update the display
    function updateDisplay() {
      hoursEl.textContent = String(timer.hours).padStart(2, '0');
      minutesEl.textContent = String(timer.minutes).padStart(2, '0');
      secondsEl.textContent = String(timer.seconds).padStart(2, '0');
    }
  
    // Modifier la fonction de fin de compte à rebours
    function startCountdown() {
      if (isPaused) {
        isPaused = false;
        return;
      }
  
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
          console.log("Temps écoulé - Jouer le son");
  
          // Jouer le son à la fin du compte à rebours
          alarmSound.play().catch(error => console.error("Erreur lors de la lecture du son :", error));
  
          alert("Time's up!");
        }
        updateDisplay();
      }, 1000);
    }
  
    // Event listeners
    setBtn.addEventListener('click', () => {
      timer.hours = parseInt(setHours.value) || 0;
      timer.minutes = parseInt(setMinutes.value) || 0;
      timer.seconds = parseInt(setSeconds.value) || 0;
      updateDisplay();
    });
  
    startBtn.addEventListener('click', () => {
      if (!countdownInterval) {
        startCountdown();
      }
    });
  
    pauseBtn.addEventListener('click', () => {
      if (countdownInterval) {
        clearInterval(countdownInterval);
        isPaused = true;
    
        // Afficher Play et masquer Pause
        pauseBtn.hidden = true;
        playBtn.hidden = false;
      }
    });
  
    clearBtn.addEventListener('click', () => {
      clearInterval(countdownInterval);
      countdownInterval = null;
      timer.hours = 0;
      timer.minutes = 0;
      timer.seconds = 0;
      isPaused = false;
      updateDisplay();
    });
  
    // Ajout de l'événement pour "Stop"
    stopBtn.addEventListener('click', () => {
      // Si le son est en train de jouer, le mettre en pause et le réinitialiser
      if (!alarmSound.paused) {
        alarmSound.pause();
        alarmSound.currentTime = 0; // Revenir au début du son
        console.log("Son arrêté et réinitialisé.");
      }
      // Stopper également le compte à rebours
      clearInterval(countdownInterval);
      countdownInterval = null;
      isPaused = false;
      console.log("Compte à rebours arrêté.");
    });
  });
  
 // Reprendre le compte à rebours après une pause
playBtn.addEventListener('click', () => {
  if (isPaused) {
    isPaused = false; // Réinitialise l'état de pause

    // Masquer le bouton Play et afficher le bouton Pause
    playBtn.hidden = true;
    pauseBtn.hidden = false;

    // Redémarrer le compte à rebours
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
        // Compte à rebours terminé
        clearInterval(countdownInterval);
        countdownInterval = null;
        alarmSound.play().catch((error) => console.error("Erreur lors de la lecture du son :", error));
        alert("Time's up!");
      }

      updateDisplay(); // Mettre à jour l'affichage
    }, 1000);
  }
});

// Pause le compte à rebours
pauseBtn.addEventListener('click', () => {
  if (countdownInterval) {
    clearInterval(countdownInterval); // Stopper l'intervalle
    countdownInterval = null;
    isPaused = true; // Mettre le compteur en pause

    // Masquer le bouton Pause et afficher le bouton Play
    pauseBtn.hidden = true;
    playBtn.hidden = false;
  }
});
*/
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
