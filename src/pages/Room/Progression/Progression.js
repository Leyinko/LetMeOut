import { audioConfig, playSound } from '../../../components/audio/Audio';
import Countdown, { handleTime } from '../../../components/countdown/Countdown';
import { statsCollector } from '../../../data/localStorage/LS';
import { ticketWSListen } from '../../../data/webSocket/webSocket';
import { timer } from '../../../utils';
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
        audio.id = 'the-prospector';
        audioConfig(audio, true, true, 0.2);
      }, 4800);
    },
    { once: true }
  );
}

// Inputs
export function passwordHandler(input, box) {
  let access = document.querySelector(`#${box}`);
  let room = document.querySelector('#room');

  if (access.id === 'games-password') {
    let ticket = Array.from(document.querySelectorAll('#active img')).at(-1);
    let code = /\-[0-9]*/;

    // Check Access
    ticket.classList.contains('got') && ticket.src.match(code)[0].substring(1) == input.value
      ? accessSound('access-granted') &&
        (access.remove(), statsCollector('timestamps', 'stage3', timer(room.getAttribute('stamp'))))
      : accessSound('error') && handleTime(30, false);
  } else {
    let connect = document.querySelector('img#connect').getAttribute('code');
    // Check Access
    connect == input.value
      ? accessSound('access-granted') && access.remove()
      : accessSound('error') && handleTime(30, false);
  }
}

// Access Granted/Denied/Success

// success
// access-granted
// error

export function accessSound(action) {
  let sound = new Audio(`src/assets/audio/sounds/console/${action}.mp3`);
  playSound(sound);
  return true;
}

// Objects Lock & Unlock
export function lockPath() {
  let elements = ['#console', '#connect', '#folder', '#transfer-panel button', '#ticket'];
  elements.forEach((element) => document.querySelector(`${element}`).classList.add('block'));
}

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

  // Terminal
  index === 0 ? element.click() || terminal.classList.remove('opened') : null;
  // Polaroid
  index === 4 && inv && inv.classList.contains('got') && ticketWSListen();
}

export function unlockTicket(signal) {
  let room = document.querySelector(`#room[room="${signal}"]`);
  room && document.querySelector('#ticket').classList.remove('block');
  playSound(new Audio('src/assets/audio/sounds/console/next-3.mp3'));
}

// Next Stage & Time Stamp
export const nextStage = (current) => {
  let room = document.querySelector('#room');
  let sound = new Audio(`src/assets/audio/sounds/console/next-${current}.mp3`);
  // Stage
  document.querySelector('#room').getAttribute('progression') === current &&
    playSound(sound) &&
    itemsPrintOnStage(Number(current));
  // Stats
  statsCollector('timestamps', `stage${current}`, timer(room.getAttribute('stamp')));
  // Reset
  room.setAttribute('stamp', new Date().getTime());
};
