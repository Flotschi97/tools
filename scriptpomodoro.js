let timerDisplay = document.getElementById('timer');
let timerModeDisplay = document.getElementById('timer-mode'); // Anzeige für den Timer-Modus
let startButton = document.getElementById('start');
let pauseButton = document.getElementById('pause');
let resetButton = document.getElementById('reset');

let clickSound = document.getElementById('click-sound');
let alarmSound = document.getElementById('alarm-sound');

let workTime = 25 * 60; // 25 Minuten Arbeitszeit
let breakTime = 5 * 60;  // 5 Minuten Pause
let timeLeft = workTime;
let timerInterval;
let isPaused = true;
let onBreak = false; // Flag, um zu bestimmen, ob wir uns in der Pause befinden
let startTime = 0; // Zeitpunkt des Timerstarts

// Anfrage für Benachrichtigungen
if (Notification.permission === "default") {
    Notification.requestPermission().then(permission => {
        if (permission === "granted") {
            console.log("Benachrichtigungen erlaubt.");
        } else {
            console.log("Benachrichtigungen nicht erlaubt.");
        }
    });
}

function playClickSound() {
    clickSound.play();
}

function showNotification(message) {
    if (Notification.permission === "granted") {
        new Notification("Pomodoro Timer", {
            body: message,
        });
    }
}

function updateTimerDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function updateTimerMode() {
    if (onBreak) {
        timerModeDisplay.textContent = "Pausenzeit";
    } else {
        timerModeDisplay.textContent = "Arbeitszeit";
    }
}

function startTimer() {
    if (isPaused) {
        isPaused = false;
        playClickSound(); // Klick Sound beim Starten
        startTime = Date.now(); // Setzt den Startzeitpunkt
        updateTimerMode(); // Modus aktualisieren
        timerInterval = setInterval(() => {
            let now = Date.now();
            let elapsed = Math.floor((now - startTime) / 1000); // Tatsächlich verstrichene Sekunden
            timeLeft = (onBreak ? breakTime : workTime) - elapsed; // Berechnet verbleibende Zeit
            
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                alarmSound.play(); // Alarm Sound wenn der Timer endet
                
                if (!onBreak) {
                    showNotification("Arbeitszeit beendet! Zeit für eine Pause.");
                    timeLeft = breakTime; // 5 Minuten Pause starten
                    onBreak = true; // Wir befinden uns jetzt in der Pause
                    updateTimerDisplay();
                    updateTimerMode(); // Modus auf Pausenzeit ändern
                    startBreakTimer(); // Starte den Pausentimer
                } else {
                    showNotification("Pause ist zu Ende! Starte die nächste Arbeitsphase.");
                    resetTimer(); // Timer zurücksetzen nach der Pause
                }
            } else {
                updateTimerDisplay();
            }
        }, 1000);
    }
}

function startBreakTimer() {
    startTime = Date.now(); // Setzt den Startzeitpunkt für die Pause
    timerInterval = setInterval(() => {
        let now = Date.now();
        let elapsed = Math.floor((now - startTime) / 1000); // Tatsächlich verstrichene Sekunden
        timeLeft = breakTime - elapsed; // Berechnet verbleibende Pausenzeit
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alarmSound.play(); // Alarm Sound wenn die Pause endet
            showNotification("ausenzeit zu Ende, für ein neues Intervall starte bitte den Timer erneut.");
            resetTimer(); // Timer zurücksetzen nach der Pause
        } else {
            updateTimerDisplay();
        }
    }, 1000);
}

function pauseTimer() {
    isPaused = true;
    playClickSound(); // Klick Sound beim Pausieren
    clearInterval(timerInterval);
}

function resetTimer() {
    playClickSound(); // Klick Sound beim Zurücksetzen
    clearInterval(timerInterval);
    timeLeft = workTime; // Zurück auf Arbeitszeit
    onBreak = false; // Arbeitsmodus
    updateTimerDisplay();
    updateTimerMode(); // Modus auf Arbeitszeit zurücksetzen
    isPaused = true;
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

updateTimerDisplay(); // Initialer Timer-Display
updateTimerMode(); // Initialer Timer-Modus
