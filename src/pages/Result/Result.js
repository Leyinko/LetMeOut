import { audioConfig, playSound } from '../../components/audio/Audio';
import { remainingTime } from '../../components/countdown/Countdown';
import Menu from '../../components/menu/Menu';
import { sendScore } from '../../data/fetch';
import { setTotalTime } from '../../data/localStorage/LS';
import sendRequest from '../../data/webSocket/webSocket';
import { toMain } from '../Main/Opening';
import Main from '../Main/utils/Main/Main';
import './Result.css';

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

  // Score
  sendRequest('setPlayerTime', null, null, null, remainingTime);
  sendScore();
  // let score = localStorage.getItem('stats');

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

export function gameOverAnimation() {
  // App
  const app = document.querySelector('#app');
  const room = document.querySelector('#room');
  room.style.animation = 'glitch 0.6s ease-in-out';

  const audio = document.createElement('audio');
  audio.src = 'src/assets/game-over.mp3';
  audioConfig(audio, true, false, 0.9);

  audio.addEventListener('ended', () => Lose());

  app.appendChild(audio);

  setTimeout(() => {
    room.remove();
    document.querySelector('#terminal').remove();
  }, 500);

  setTimeout(() => {
    // Animation
    const animation = document.createElement('video');
    animation.id = 'game-over ';
    animation.autoplay = true;
    animation.controls = false;
    animation.src = 'src/assets/Lose-animation.mp4';

    app.appendChild(animation);

    animation.addEventListener('ended', () => animation.remove());
  }, 2350);

  setTimeout(() => {
    playSound(new Audio('src/assets/audio/sounds/rooms/power-down-tv.mp3'));
  }, 3500);
}
