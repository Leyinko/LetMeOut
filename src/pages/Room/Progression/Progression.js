import { audioConfig, playSound } from '../../../components/audio/Audio';
import Countdown, { handleTime } from '../../../components/countdown/Countdown';
import { ticketWSListen } from '../../../data/webSocket/webSocket';
import { Inventory } from '../Inventory/inventory';
import { itemsPrintOnStage } from '../Prints/Prints';
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
      : denied() && handleTime(30, false);
  } else {
    let connect = document.querySelector('img#connect').getAttribute('code');
    // Check Access
    connect == input.value ? granted() && access.remove() : denied() && handleTime(30, false);
  }
}

// Access Granted/Denied/Notifications Stages && Colliders Sounds
export function granted() {
  let sound = new Audio('src/assets/audio/sounds/console/access-granted.mp3');
  playSound(sound);
  return true;
}

export function denied() {
  let sound = new Audio('src/assets/audio/sounds/console/error.mp3');
  playSound(sound);
  return true;
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

  inv && inv.classList.contains('got') && element && element.classList.remove('block');

  // Terminal Conditional
  index === 0 ? element.click() || terminal.classList.remove('opened') : null;
  // Ticket Conditional
  index === 4 && inv && inv.classList.contains('got') && ticketWSListen();
}

export function unlockTicket(signal) {
  let room = document.querySelector(`#room[room="${signal}"]`);
  room && document.querySelector('#ticket').classList.remove('block');
}

// Next Stage
export function nextStage(current) {
  document.querySelector('#room').getAttribute('progression') === current && itemsPrintOnStage(Number(current));
}
