import { audioConfig, playSound } from '../../components/audio/Audio';
import Menu from '../../components/menu/Menu';
import { sendScore } from '../../data/fetch';
import { setTotalTime } from '../../data/localStorage/LS';
import sendRequest from '../../data/webSocket/webSocket';
import { toMain } from '../Main/Opening';
import Main from '../Main/utils/Main/Main';
import './Result.css';

import html2canvas from 'html2canvas';

export const Win = () => {
  // App
  const app = document.querySelector('#app');
  app.innerHTML = '';

  const result = document.createElement('section');
  result.id = 'result';
  app.append(result);

  let message = document.createElement('h1');
  message.textContent = 'Congratulations!';

  result.appendChild(message);

  // Time
  setTotalTime();

  // Test
  setTimeout(() => sendScore(), 6000);

  // Back To Main
  Menu('BACK TO MAIN', 'back-to-main', result);
  const back = document.querySelector('.back-to-main');
  back.addEventListener('click', () => {
    // Reset Previous Section
    result.remove();
    // Main
    Main();
  });
};

export const Lose = () => {
  const result = document.createElement('section');
  result.id = 'result';
  app.append(result);

  let message = document.createElement('h1');
  message.textContent = 'Game Over';

  result.appendChild(message);

  // Time
  setTotalTime();

  // Test IMG Stat
  containerImageStat(result);
  // Test IMG Stat

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

function containerImageStat(parent) {
  let data = JSON.parse(localStorage.getItem('mock'));
  let username = JSON.parse(localStorage.getItem('data')).username;
  let app = document.querySelector('#app');

  let stats = {};

  data.forEach((object) => {
    let keys = Object.keys(object);
    keys.forEach((key) => {
      if (!stats.hasOwnProperty(object[key])) {
        stats[key] = object[key];
      }
    });
  });

  console.log(Object.entries(stats));

  // console.log(data.flat());

  let container = document.createElement('div');
  container.id = 'ending-stats';

  const statsElement = [];

  Object.entries(stats).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((element, index) => {
        statsElement.push({ key: `${key}${index}`, value: element });
      });
    } else {
      statsElement.push({ key, value });
    }
  });

  statsElement.forEach((stat) => {
    const element = document.createElement('span');
    element.id = stat.key;
    element.textContent = stat.value;
    element.className = 'stat-span';

    container.appendChild(element);
  });

  parent.appendChild(container);

  // const stats = document.createElement('ul');
  // stats.innerHTML = `
  //   <li>Clicks: ${data[0].clicks}</li>
  //   <h3>Errors and Time on Mini Games:</h3>
  //   <li>1- ${data[0].games[0]} Errors | Time: ${data[1].minigames[0]} sec</li>
  //   <li>2- ${data[0].games[1]} Errors | Time: ${data[1].minigames[1]} sec</li>
  //   <li>3- ${data[0].games[2]} Errors | Time: ${data[1].minigames[2]} sec</li>
  //   <h3>Time spend on Stages:</h3>
  //   <li>Stage 1: ${data[1].stage1}</li>
  //   <li>Stage 2: ${data[1].stage2}</li>
  //   <li>Stage 3: ${data[1].stage3}</li>
  //   <h1>Total time: ${data[1].total}</h1>
  //   <li>${data[2].sent} messages sent and ${data[2].received} messages received</li>
  //   <li>Hidden Ending: ${data[3].alternative ? '✔' : '❌'}</li>
  // `;

  // container.appendChild(stats);

  // Download PNG
  const download = document.createElement('a');
  download.className = 'download-button';
  html2canvas(document.querySelector('#ending-stats')).then((canvas) => {
    download.href = canvas.toDataURL('image/png');
  });

  download.download = `${username}-${new Date().toLocaleDateString('en-US')}.png`;

  app.appendChild(download);
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
