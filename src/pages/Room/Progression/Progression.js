import { accessSound, audioConfig, playSound } from '../../../components/audio/Audio';
import Countdown, { handleTime, remainingTime } from '../../../components/countdown/Countdown';
import { gameAccess, sendScore } from '../../../data/fetch';
import { statsCollector } from '../../../data/localStorage/LS';
import sendRequest, { ticketWSListen } from '../../../data/webSocket/webSocket';
import { timer } from '../../../utils';
import { Inventory } from '../Inventory/inventory';
import { itemsPrintOnStage } from '../Prints/Prints';
import { difficulty } from '../Room';
import { difficulty_settings } from './Difficulty';

// Start Game Trigger
export function firstClickStart() {
  const room = document.querySelector('#room');

  room.addEventListener(
    'click',
    () => {
      // ! TEST for Insta Trigger
      //
      // ! TEST for Insta Trigger
      let clock = new Audio('/assets/audio/sounds/lobby/Clock-loading.mp3');
      setTimeout(() => playSound(clock), 500);
      // Time
      Countdown();
      // Inventory HUD
      Inventory('active', room);
      Inventory('passive', room);
      setTimeout(() => {
        const audio = document.querySelector('audio');
        audio.src = '/assets/audio/music/The-Prospector.mp3';
        audioConfig(audio, true, true, 0.2);
      }, 4800);
    },
    { once: true }
  );
}

// Inputs = Chat/Games/Final/Beta
export function passwordHandler(input, box) {
  let access = document.querySelector(`#${box}`);
  let room = document.querySelector('#room');

  switch (access.id) {
    case 'games-password':
      let ticket = Array.from(document.querySelectorAll('#active img')).at(-1);
      let code = /\-[0-9]*/;
      // Check Access
      ticket.classList.contains('got') && ticket.src.match(code)[0].substring(1) == input.value
        ? accessSound('access-granted') &&
          (access.remove(), statsCollector('timestamps', 'stage3', timer(room.getAttribute('stamp'))))
        : accessSound('error') && handleTime(30, false);
      break;
    case 'release':
      sendRequest('checkFinalCode', null, null, null, input.value);
      break;
    case 'access':
      gameAccess(input.value).then((res) => {
        res ? accessSound('access-granted') && access.remove() : accessSound('error');
      });
      break;
    default:
      let connect = document.querySelector('img#connect').getAttribute('code');
      // Check Access
      connect == input.value
        ? accessSound('access-granted') && access.remove()
        : accessSound('error') && handleTime(30, false);
  }
}

// Objects Lock & Unlock
export function lockPaths() {
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
  if (room && document.querySelector('#ticket').classList.contains('block')) {
    playSound(new Audio('/assets/audio/sounds/console/next-3.mp3'));
    nextStage('3');
    document.querySelector('#ticket').classList.remove('block');
  }
}

// Next Stage
export const nextStage = (current) => {
  let room = document.querySelector('#room');
  let sound = new Audio(`/assets/audio/sounds/console/next-${current}.mp3`);

  // Stage
  if (document.querySelector('#room').getAttribute('progression') === current) {
    difficulty !== 'HARD' && setTimeout(() => signalStage(current), 800);
    playSound(sound) && itemsPrintOnStage(Number(current));
  }
  // Stats
  statsCollector('timestamps', `stage${current}`, timer(room.getAttribute('stamp')));
  // Reset Stamp
  room.setAttribute('stamp', new Date().getTime());
};

export function signalStage(current) {
  let subtitles = [
    '- What was that? Did that sound come from the room?',
    '- That noise again...',
    '- Something definitely happened.',
  ];

  let halo = document.createElement('div');
  halo.id = 'halo';

  let subtitle = document.createElement('span');
  subtitle.textContent = subtitles[current - 1];

  halo.appendChild(subtitle);
  app.appendChild(halo);

  halo.addEventListener('animationend', () => halo.remove());
}

// Final
export function unlockHiddenEnding() {
  const folder = document.querySelector('#folder');

  playSound(new Audio('assets/audio/sounds/console/time-sent.mp3'));

  folder.style.animation = 'glitch 0.6s ease-in-out infinite alternate-reverse';
  folder.addEventListener('click', () => (folder.style.animation = ''), { once: true });

  document.querySelector('#usb-3').classList.remove('locked');
}

export function waitingPlayersForReboot(states) {
  const app = document.querySelector('#app');

  let waiting = document.querySelector('img');
  waiting.src = '/assets/images/pictures/console/terminal-final.png';
  waiting.className = 'waiting';

  // Reset
  app.innerHTML = '';

  playSound(new Audio('/assets/audio/sounds/rooms/screen-break.mp3'));

  setTimeout(() => {
    app.appendChild(waiting);

    // Data
    const confirmation = document.createElement('h3');
    confirmation.id = 'confirmation-out';
    confirmation.textContent = String(states.length);

    app.appendChild(confirmation);
  }, 1500);
}

export function calculateScore() {
  let statsLS = JSON.parse(localStorage.getItem('stats'));
  let dataLS = JSON.parse(localStorage.getItem('data'));

  let clicksScore = statsLS[0].clicks * difficulty_settings[difficulty].score.clicks;
  let errorsScore = statsLS[0].games.reduce((acc, next) => acc + next) * difficulty_settings[difficulty].score.repair;
  let loss = (difficulty_settings[difficulty].global * 60 - remainingTime) * difficulty_settings[difficulty].score.loss;

  let score =
    difficulty_settings[difficulty].score.initial -
    clicksScore -
    errorsScore -
    loss +
    difficulty_settings[difficulty].score.end;

  return dataLS.alternative ? score + difficulty_settings[difficulty].score.hidden : score;
}

export function setScores() {
  let data = JSON.parse(localStorage.getItem('data'));
  let self = data.players.find((player) => player.name === data.username);
  let score = calculateScore();
  // Send Individual Score
  let timeout = (data.players.indexOf(self) + 1) * 2000;
  setTimeout(() => sendRequest('setPlayerTime', null, null, null, score), timeout);
  // Send Team Score
  data.players.at(-1).name == data.username && setTimeout(() => sendScore(), 10000);
}
