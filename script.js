const audioContext = new (window.AudioContext || window.webkitAudioContext)();

const playNote = (frequency, duration = 0.3, startTime = 0) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, startTime);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    gainNode.gain.setValueAtTime(1, startTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    oscillator.start(startTime);
    oscillator.stop(startTime + duration);
};

const noteFrequencies = {
    'C4': 261.63,
    'D4': 293.66,
    'E4': 329.63,
    'F4': 349.23,
    'G4': 392.00,
    'A4': 440.00,
    'B4': 493.88,
    'C5': 523.25
};

const jingleBells = [
    { note: 'E4', duration: 0.3 }, { note: 'E4', duration: 0.3 }, { note: 'E4', duration: 0.6 },
    { note: 'E4', duration: 0.3 }, { note: 'E4', duration: 0.3 }, { note: 'E4', duration: 0.6 },
    { note: 'E4', duration: 0.3 }, { note: 'G4', duration: 0.3 }, { note: 'C4', duration: 0.3 },
    { note: 'D4', duration: 0.3 }, { note: 'E4', duration: 0.6 },
    { note: 'F4', duration: 0.3 }, { note: 'F4', duration: 0.3 }, { note: 'F4', duration: 0.45 },
    { note: 'F4', duration: 0.15 }, { note: 'F4', duration: 0.3 }, { note: 'E4', duration: 0.3 },
    { note: 'E4', duration: 0.3 }, { note: 'E4', duration: 0.45 }, { note: 'E4', duration: 0.15 },
    { note: 'E4', duration: 0.3 }, { note: 'D4', duration: 0.3 }, { note: 'D4', duration: 0.3 },
    { note: 'E4', duration: 0.3 }, { note: 'D4', duration: 0.3 }, { note: 'G4', duration: 0.6 },
    { note: 'E4', duration: 0.3 }, { note: 'E4', duration: 0.3 }, { note: 'E4', duration: 0.6 },
    { note: 'E4', duration: 0.3 }, { note: 'E4', duration: 0.3 }, { note: 'E4', duration: 0.6 },
    { note: 'E4', duration: 0.3 }, { note: 'G4', duration: 0.3 }, { note: 'C4', duration: 0.3 },
    { note: 'D4', duration: 0.3 }, { note: 'E4', duration: 0.6 },
    { note: 'F4', duration: 0.3 }, { note: 'F4', duration: 0.3 }, { note: 'F4', duration: 0.45 },
    { note: 'F4', duration: 0.15 }, { note: 'F4', duration: 0.3 }, { note: 'E4', duration: 0.3 },
    { note: 'E4', duration: 0.3 }, { note: 'E4', duration: 0.15 }, { note: 'E4', duration: 0.15 },
    { note: 'G4', duration: 0.3 }, { note: 'G4', duration: 0.3 }, { note: 'F4', duration: 0.3 },
    { note: 'D4', duration: 0.3 }, { note: 'C4', duration: 0.6 }
];

const playJingleBells = () => {
    const playButton = document.querySelector('#play-song');
    playButton.disabled = true;

    let startTime = audioContext.currentTime;
    jingleBells.forEach(({ note, duration }) => {
        playNote(noteFrequencies[note], duration, startTime);
        startTime += duration + 0.1;
    });

    setTimeout(() => {
        playButton.disabled = false;
    }, (startTime - audioContext.currentTime) * 1000);
};

document.querySelector('#play-song').addEventListener('click', () => playJingleBells());

function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');

    snowflake.style.left = Math.random() * window.innerWidth + 'px';
    snowflake.style.fontSize = (Math.random() * 1 + 0.5) + 'em';

    snowflake.textContent = '❄';

    document.body.appendChild(snowflake);

    const fallDuration = Math.random() * 3 + 2;
    snowflake.animate([
        { transform: 'translateY(0)' },
        { transform: `translateY(${window.innerHeight}px)` }
    ], {
        duration: fallDuration * 1000,
        easing: 'linear',
        fill: 'forwards'
    });

    setTimeout(() => {
        snowflake.remove();
    }, fallDuration * 1000);
}

setInterval(createSnowflake, 300);
