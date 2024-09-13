
/*Pomodoro Timer*/

let timerDisplay = document.getElementById('timer');
let startButton = document.getElementById('start');
let pauseButton = document.getElementById('pause');
let resetButton = document.getElementById('reset');

let pomodoroTime = 25 * 60; // 25 Minuten
let timeLeft = pomodoroTime;
let timerInterval;
let isPaused = true;

function playClickSound() {
    clickSound.play();
}


function updateTimerDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function startTimer() {
    if (isPaused) {
        isPaused = false;
        timerInterval = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();
            } else {
                clearInterval(timerInterval);
                alert("Zeit ist abgelaufen!");
            }
        }, 1000);
    }
}

function pauseTimer() {
    isPaused = true;
    clearInterval(timerInterval);
}

function resetTimer() {
    clearInterval(timerInterval);
    timeLeft = pomodoroTime;
    updateTimerDisplay();
    isPaused = true;
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

updateTimerDisplay(); // Initialer Timer-Display








