import sounds from '../utils/sounds';

const ukulele = document.querySelector('.ukulele');
const strumDOwn = ukulele.querySelector<HTMLButtonElement>('.downJs');
const strumUp = ukulele.querySelector<HTMLButtonElement>('.upJs');
const cChord = ukulele.querySelector('.cJs');
const dChord = ukulele.querySelector('.dJs');
const amChord = ukulele.querySelector('.amJs');
const gChord = ukulele.querySelector('.gJs');
const fChord = ukulele.querySelector('.fJs');
const strings = ukulele.querySelectorAll('.stringJs');

let currentSound: HTMLAudioElement = null;

type Chords = 'clean' | 'am' | 'c' | 'd' | 'f' | 'g';

let activeChord: Chords = 'clean';

// Handle Active Chord changes on buttons
const handleChord = (chordButton: Element, chord: Chords, key: string) => {
  chordButton.addEventListener('mousedown', () => {
    activeChord = chord;
    chordButton.classList.add('active');
    strings.forEach((string, i) => string.classList.add(`${activeChord}${i + 1}`));
  });

  document.addEventListener('keydown', (event) => {
    if (event.code === key) {
      activeChord = chord;
      chordButton.classList.add('active');
      strings.forEach((string, i) => string.classList.add(`${activeChord}${i + 1}`));
    }
  });

  chordButton.addEventListener('mouseup', () => {
    strings.forEach((string, i) => string.classList.remove(`${activeChord}${i + 1}`));
    activeChord = 'clean';
    chordButton.classList.remove('active');
  });

  document.addEventListener('keyup', (event) => {
    if (event.code === key) {
      strings.forEach((string, i) => string.classList.remove(`${activeChord}${i + 1}`));
      activeChord = 'clean';
      chordButton.classList.remove('active');
    }
  });
};

handleChord(cChord, 'c', 'KeyC');
handleChord(dChord, 'd', 'KeyD');
handleChord(amChord, 'am', 'KeyA');
handleChord(gChord, 'g', 'KeyG');
handleChord(fChord, 'f', 'KeyF');

// Work with Strums
type StrumDirection = 'up' | 'down';
const strum = (dir: StrumDirection) => {
  if (currentSound) {
    currentSound.pause(); // stop the previous sound
    currentSound.currentTime = 0; // reset to beginning
  }
  currentSound = sounds[dir][activeChord];
  currentSound.currentTime = 0; // reset to beginning
  currentSound.play();
};

strumDOwn.addEventListener('click', () => {
  strum('down');
});

strumUp.addEventListener('click', () => {
  strum('up');
});

// keyboard strums with arrows

const keyboardStrum = (arrow: string, button: HTMLButtonElement) => {
  document.addEventListener('keydown', (event) => {
    if (event.code === arrow) {
      button.click();
      button.classList.add('active');
    }
  });
  document.addEventListener('keyup', (event) => {
    if (event.code === arrow) {
      button.classList.remove('active');
    }
  });
};

keyboardStrum('ArrowUp', strumUp);
keyboardStrum('ArrowDown', strumDOwn);
