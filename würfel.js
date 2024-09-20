let clickSound = document.getElementById('click-sound');

document.getElementById('roll-button').addEventListener('click', function() {
    clickSound.play();
    // Zufallszahl zwischen 1 und 6 generieren
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    
    // Würfelsymbol aktualisieren
    document.getElementById('dice').textContent = `🎲`;

    // Ergebnis anzeigen
    document.getElementById('result').textContent = `Du hast eine ${randomNumber} gewürfelt!`;
});
