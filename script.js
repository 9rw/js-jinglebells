const playNote = (frequency) => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine'; // You can change this to 'square', 'sawtooth', or 'triangle'
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 1); // Sound will play for 1 second
};

const notes = {
    'do': 261.63,  // C4
    're': 293.66,  // D4
    'mi': 329.63,  // E4
    'fa': 349.23,  // F4
    'sol': 392.00, // G4
    'la': 440.00,  // A4
    'ti': 493.88,  // B4
    'doHigh': 523.25 // C5
};

const noteFrequencies = {
    'C4': 261.63, // Do
    'D4': 293.66, // Re
    'E4': 329.63, // Mi
    'F4': 349.23, // Fa
    'G4': 392.00, // Sol
};
// Event listeners for each note
document.getElementById('play-do').addEventListener('click', () => playNote(notes.do));
document.getElementById('play-re').addEventListener('click', () => playNote(notes.re));
document.getElementById('play-mi').addEventListener('click', () => playNote(notes.mi));
document.getElementById('play-fa').addEventListener('click', () => playNote(notes.fa));
document.getElementById('play-sol').addEventListener('click', () => playNote(notes.sol));
document.getElementById('play-la').addEventListener('click', () => playNote(notes.la));
document.getElementById('play-ti').addEventListener('click', () => playNote(notes.ti));
document.getElementById('play-do-high').addEventListener('click', () => playNote(notes.doHigh));

const jingleBells = [
    'E4', 'E4', 'E4',
    'E4', 'E4', 'E4',
    'E4', 'G4', 'C4', 'D4', 'E4',
    'F4', 'F4', 'F4', 'F4', 'F4', 'E4', 'E4',
    'E4', 'E4', 'D4', 'D4', 'E4', 'D4', 'G4'
];

const playJingleBells = () => {
    console.log('test')
    let time = 0;
    jingleBells.forEach(note => {
        setTimeout(() => {
            playNote(noteFrequencies[note]);
        }, time);
        time += 500; // Increase the time for the next note
    });
};

document.querySelector('#play-song').addEventListener('click', () => playJingleBells())
