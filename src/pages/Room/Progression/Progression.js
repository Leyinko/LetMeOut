import { audioConfig, playSound } from '../../../components/audio/Audio';
import Countdown from '../../../components/countdown/Countdown';
import { startListen } from '../../../data/webSocket/webSocket';
import { Inventory } from '../Inventory/inventory';
import './Progression.css';

// Start Game
export function firstClickStart() {
  const room = document.querySelector('#room');

  room.addEventListener(
    'click',
    () => {
      let clock = new Audio('src/assets/audio/sounds/lobby/Clock-loading.mp3');
      setTimeout(() => playSound(clock), 500);

      // Time
      Countdown();

      // Inventory HUD
      Inventory('active', room);
      Inventory('passive', room);

      setTimeout(() => {
        const audio = document.querySelector('audio');
        audio.src = 'src/assets/audio/music/The-Prospector.mp3';
        audioConfig(audio, true, true, 0.3);
      }, 4800);
    },
    { once: true }
  );
}

// Simple Input Tests ✔
export function passwordHandler(input, box) {
  let access = document.querySelector(`#${box}`);

  if (access.id === 'games-password') {
    let actives = Array.from(document.querySelectorAll('#active .got'));
    let code = /\-[0-9]*/;
    // Check Access
    actives.length >= 1 && actives.at(-1).src.match(code)[0].substring(1) == input.value
      ? granted() && access.remove()
      : denied();
  } else {
    let connect = document.querySelector('img#connect').getAttribute('code');
    // Check Access
    connect == input.value ? granted() && access.remove() : denied();
  }
}

// Access Granted/Denied Sounds
function granted() {
  let sound = new Audio('src/assets/audio/sounds/console/access-granted.mp3');
  playSound(sound);
  return true;
}

function denied() {
  let sound = new Audio('src/assets/audio/sounds/console/error.mp3');
  playSound(sound);
  // ! Time Lost
}

// Objects Unlock
export function unlockPathFromObject(index) {
  let terminal = document.querySelector('#terminal');
  let queries = [
    document.querySelector('#console'),
    document.querySelector('#connect'),
    document.querySelector('#folder'),
    document.querySelector('#transfer-panel button'),
  ];

  let inv = Array.from(document.querySelectorAll('#active img'))[index];
  let element = queries[index];

  // Ticket Conditional
  index === 4 && inv && inv.classList.contains('got') && startListen();

  inv && inv.classList.contains('got') && element && element.classList.remove('block');

  // Terminal Conditional
  index === 0 ? element.click() || terminal.classList.remove('opened') : null;
}

function WSListener() {}

// NB : WS POLAROID && PICTURE COLLIDER UNLOCK
