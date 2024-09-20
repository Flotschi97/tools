let counter = 0;
let bellSound = document.getElementById('bell-sound');
let clickSound = document.getElementById('click-sound');

function playBellSound() {
    bellSound.play();
}

function playClickSound(){
    clickSound.play();
}

function updateCounterDisplay() {
    const counterElement = document.getElementById('counter');
    counterElement.innerText = counter.toString().padStart(3, '0');
}

function blinkCounter() {
    const counterElement = document.getElementById('counter');
    counterElement.classList.add('blink');
    setTimeout(() => counterElement.classList.remove('blink'), 550);
}

function incrementCounter() {
    playClickSound();
    counter++;
    const counterElement = document.getElementById('counter');
    counterElement.innerText = counter.toString().padStart(3, '0');
    playBellSound();
    blinkCounter();
    setTimeout(blinkCounter, 2100);
    
}

function decrementCounter() {
    playClickSound();
    if (counter > 0) {
        counter--;
        updateCounterDisplay();
    }
}

function resetCounter() {
    playClickSound();
    counter = 0;
    updateCounterDisplay();
}



