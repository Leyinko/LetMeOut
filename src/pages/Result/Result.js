import { playSound } from '../../components/audio/Audio';
import Menu from '../../components/menu/Menu';
import { sendScore } from '../../data/fetch';
import { setTotalTime } from '../../data/localStorage/LS';
import { preloadVideo } from '../../data/preload';
import { toMain } from '../Main/Opening';
import html2canvas from 'html2canvas';
import './Result.css';

// ! ANIMATION PRELOAD
const gameover = preloadVideo('game-over', '/assets/Lose-animation.mp4');
// const win = preloadVideo('game-over', '/assets/Lose-animation.mp4');
// ! ANIMATION PRELOAD

export function GameResult(out) {
  // App
  const app = document.querySelector('#app');
  app.innerHTML = '';

  // Container
  const result = document.createElement('section');
  result.id = 'result';
  app.append(result);

  // Message
  let message = document.createElement('h1');
  result.appendChild(message);

  // Back To Main
  Menu('BACK TO MAIN', 'back-to-main', result);
  const back = document.querySelector('.back-to-main');
  back.addEventListener('click', () => {
    app.innerHTML = '';
    toMain(app);
  });

  // Condition
  if (out) {
    message.textContent = 'Con-DRAG-ulations';
    // Time
    setTotalTime();
    // Score PNG
    resultStatsPNG(result);
    // Send Team Score to DDBB
    setTimeout(() => sendScore(), 6000);
  } else {
    message.textContent = 'YOU LOSE';
  }
  return true;
}

function resultStatsPNG(parent) {
  let app = document.querySelector('#app');
  let username = JSON.parse(localStorage.getItem('data')).username;
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

  playSound(new Audio('/assets/audio/sounds/game-over.mp3'));

  setTimeout(() => (app.innerHTML = ''), 500);

  setTimeout(() => {
    app.appendChild(gameover);
    gameover.play();

    gameover.addEventListener('ended', () => gameover.remove());
  }, 2200);

  setTimeout(() => {
    playSound(new Audio('/assets/audio/sounds/rooms/power-down-tv.mp3'));
  }, 3500);

  setTimeout(() => GameResult(false), 12000);
}
