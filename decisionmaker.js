let clickSound = document.getElementById('click-sound');

document.getElementById('add-field').addEventListener('click', function() {
    // Ein neues Eingabefeld hinzufügen
    clickSound.play();
    const newInput = document.createElement('div');
    newInput.className = 'decision-input';
    newInput.innerHTML = '<input type="text" placeholder="Weitere Option">';
    document.getElementById('decision-fields').appendChild(newInput);
});

document.getElementById('decide-button').addEventListener('click', function() {
    clickSound.play();
    const inputs = document.querySelectorAll('#decision-fields input');
    const options = [];

    // Alle ausgefüllten Felder sammeln
    inputs.forEach(input => {
        if (input.value.trim() !== '') {
            options.push(input.value.trim());
        }
    });

    if (options.length > 0) {
        // Zufällig eine der Optionen auswählen
        const randomIndex = Math.floor(Math.random() * options.length);
        document.getElementById('result').innerText = `Gewählt: ${options[randomIndex]}`;
    } else {
        document.getElementById('result').innerText = 'Bitte mindestens eine Option eintragen!';
    }
});

function playClickSound() {
    clickSound.play();
}

function resetDecision() {
    playClickSound();
    location.reload();
}