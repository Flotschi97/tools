let counter = 0;

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
    counter++;
    const counterElement = document.getElementById('counter');
    counterElement.innerText = counter.toString().padStart(3, '0');

    blinkCounter();
    setTimeout(blinkCounter, 2100);
}

function decrementCounter() {
    if (counter > 0) {
        counter--;
        updateCounterDisplay();
    }
}

function resetCounter() {
    counter = 0;
    updateCounterDisplay();
}



