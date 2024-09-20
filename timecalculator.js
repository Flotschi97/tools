let clickSound = document.getElementById('click-sound');
let timeInputs;

document.getElementById('addTimeBtn').addEventListener('click', function() {
    // Neues Zeit-Eingabefeld hinzufügen
    playClickSound(); //Klick-Sound abspielen
    const newRow = document.createElement('div');
    newRow.classList.add('time-row');
    newRow.innerHTML = `<input type="time" class="timeInput" step="1" value="00:00:00">`;
    document.getElementById('timeForm').appendChild(newRow);
});


function playClickSound() {
    clickSound.play();
}

function calculateTotalTime() {
    playClickSound(); //Klick-Sound abspielen
    const timeInputs = document.getElementsByClassName('timeInput');
    let totalSeconds = 0;

    for (let i = 0; i < timeInputs.length; i++) {
        const timeValue = timeInputs[i].value;
        if (timeValue) {
            const [hours, minutes, seconds] = timeValue.split(':').map(Number);
            totalSeconds += hours * 3600 + minutes * 60 + seconds;
        }
    }

    const totalHours = Math.floor(totalSeconds / 3600);
    const totalMinutes = Math.floor((totalSeconds % 3600) / 60);
    const remainingSeconds = totalSeconds % 60;

    document.getElementById('result').textContent = `Gesamtsumme: ${totalHours} Stunden, ${totalMinutes} Minuten und ${remainingSeconds} Sekunden.`;
}




function resetTime() {
    playClickSound();
    location.reload();
}