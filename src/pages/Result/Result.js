import { playSound } from '../../components/audio/Audio';
import Menu from '../../components/menu/Menu';
import { sendScore, sendUserStats } from '../../data/fetch';
import { preloadVideo } from '../../data/preload';
import { toMain } from '../Main/Opening';
import html2canvas from 'html2canvas';
import { calculateScore, setScores } from '../Room/Progression/Progression';
import './Result.css';

// Video Preload
const gameover = preloadVideo('game-over', '/assets/video/Lose-animation.mp4');
const win = preloadVideo('game-over', '/assets/video/Win-animation.mp4');

export function GameResult(out) {
  const app = document.querySelector('#app');
  app.innerHTML = '';

  const result = document.createElement('section');
  result.id = 'result';
  app.append(result);

  let message = document.createElement('h1');
  result.appendChild(message);

  // Back to Main
  Menu('BACK TO MAIN', 'back-to-main', result);
  const back = document.querySelector('.back-to-main');
  back.addEventListener('click', () => {
    app.innerHTML = '';
    toMain(app);
  });

  // Conditions
  if (out) {
    message.textContent = 'Con-DRAG-ulations';
    // TEST
    setScores();
    // Score PNG
    resultStatsPNG(result);
  } else {
    message.textContent = 'YOU LOSE';
    // ! BETA
    // Send Stats
    sendUserStats();
  }
  return true;
}

export function gameOverAnimation() {
  const app = document.querySelector('#app');
  const room = document.querySelector('#room');
  room && (room.style.animation = 'glitch 0.6s ease-in-out');

  playSound(new Audio('/assets/audio/sounds/console/game-over.mp3'));

  setTimeout(() => (app.innerHTML = ''), 500);

  setTimeout(() => {
    app.appendChild(gameover);
    gameover.play();

    gameover.addEventListener('ended', () => gameover.remove());
  }, 1200);

  setTimeout(() => GameResult(false), 10000);
}

export function winAnimation() {
  //
  const app = document.querySelector('#app');

  setTimeout(() => (app.innerHTML = ''), 500);

  setTimeout(() => {
    app.appendChild(win);
    win.volume = 1;
    win.play();

    win.addEventListener('ended', () => GameResult(true) && win.remove());
  }, 2200);
}

function resultStatsPNG(parent) {
  let app = document.querySelector('#app');
  let dataLS = JSON.parse(localStorage.getItem('data'));
  let statsLS = JSON.parse(localStorage.getItem('stats'));

  // Score
  let clicksScore = statsLS[0].clicks * 100;
  let errorsScore = statsLS[0].games.reduce((acc, next) => acc + next) * 10000;
  let score = calculateScore();

  // Stats
  let stats = {
    username: dataLS.username,
    date: dataLS.date,
    total: score,
    errors_clicks: `-${clicksScore}`,
    errors_points: `-${errorsScore}`,
    alternative: dataLS.alternative,
  };

  statsLS.forEach((object) => {
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

  download.download = `${dataLS.username}-${new Date().toLocaleDateString('en-US')}.png`;

  app.appendChild(download);
}

function getIndividualRankNote(score) {
  if (score >= 800000) return 'S';
  if (score < 800000 && score >= 700000) return 'A';
  if (score < 700000 && score >= 500000) return 'B';
  if (score < 500000 && score >= 350000) return 'C';
  if (score < 350000) return 'D';
}
