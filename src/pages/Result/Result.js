import { audioConfig, playSound } from '../../components/audio/Audio';
import Menu from '../../components/menu/Menu';
import { sendScore } from '../../data/fetch';
import { setTotalTime } from '../../data/localStorage/LS';
import sendRequest from '../../data/webSocket/webSocket';
import { toMain } from '../Main/Opening';
import Main from '../Main/utils/Main/Main';
import './Result.css';

import html2canvas from 'html2canvas';

// export function GameResult(result) {
//   if (result) {
//   }
// }

export const Win = () => {
  // App
  const app = document.querySelector('#app');
  app.innerHTML = '';

  const result = document.createElement('section');
  result.id = 'result';
  app.append(result);

  let message = document.createElement('h1');
  message.textContent = 'Con-DRAG-ulations!';

  result.appendChild(message);

  // Time
  setTotalTime();

  // Test IMG Stat
  resultStatsPNG(result);
  // Test IMG Stat

  // Test
  setTimeout(() => sendScore(), 6000);

  // Back To Main
  Menu('BACK TO MAIN', 'back-to-main', result);
  const back = document.querySelector('.back-to-main');
  back.addEventListener('click', () => {
    // MAin
    result.remove();
    toMain(app);
  });
};

export const Lose = () => {
  const result = document.createElement('section');
  result.id = 'result';
  app.append(result);

  let message = document.createElement('h1');
  message.textContent = 'GAME OVER';

  result.appendChild(message);

  // Back To Main
  Menu('BACK TO MAIN', 'back-to-main', result);
  const back = document.querySelector('.back-to-main');
  back.addEventListener('click', () => {
    // Main
    result.remove();
    toMain(app);
  });
  return true;
};

function resultStatsPNG(parent) {
  let app = document.querySelector('#app');
  let username = JSON.parse(localStorage.getItem('data')).username;

  // let data = JSON.parse(localStorage.getItem('mock'));
  let data = JSON.parse(localStorage.getItem('stats'));

  // Stats
  let stats = { username: username };
  data.forEach((object) => {
    let entries = Object.entries(object);
    entries.forEach(([key, value]) => {
      if (!stats.hasOwnProperty(object[key]) && !Array.isArray(value)) {
        stats[key] = object[key];
      } else {
        value.forEach((value, index) => {
          stats[`${key}${index}`] = value;
        });
      }
    });
  });

  // Print Stats
  let container = document.createElement('div');
  container.id = 'ending-stats';

  Object.entries(stats).forEach(([key, value]) => {
    const element = document.createElement('span');
    element.id = `LS-${key}`;
    element.textContent = value === true ? '✔' : /minigame|stage/.test(key) ? value + 's' : value;
    element.className = 'stat-span';

    container.appendChild(element);
  });

  parent.appendChild(container);

  // Rank
  const note = document.createElement('h1');
  note.textContent = getIndividualRankNote(Number(stats.total));

  container.appendChild(note);

  // Download
  const download = document.createElement('a');
  download.className = 'download-button';
  html2canvas(document.querySelector('#ending-stats')).then((canvas) => {
    download.href = canvas.toDataURL('image/png');
  });

  download.download = `${username}-${new Date().toLocaleDateString('en-US')}.png`;

  app.appendChild(download);
}

function getIndividualRankNote(score) {
  if (score > 600) return 'S';
  if (score < 600 && score > 500) return 'A';
  if (score > 300 && score < 500) return 'B';
  if (score > 200 && score < 300) return 'C';
  if (score < 200) return 'D';
}

export function gameOverAnimation() {
  // App
  const app = document.querySelector('#app');
  const room = document.querySelector('#room');
  room.style.animation = 'glitch 0.6s ease-in-out';

  playSound(new Audio('src/assets/game-over.mp3'));

  setTimeout(() => (app.innerHTML = ''), 500);

  setTimeout(() => {
    // Animation
    const animation = document.createElement('video');
    animation.id = 'game-over ';
    animation.autoplay = true;
    animation.controls = false;
    animation.src = 'src/assets/Lose-animation.mp4';

    app.appendChild(animation);

    animation.addEventListener('ended', () => animation.remove());
  }, 2200);

  setTimeout(() => {
    playSound(new Audio('src/assets/audio/sounds/rooms/power-down-tv.mp3'));
  }, 3500);

  setTimeout(() => Lose(), 12000);
}
