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
  // App
  const app = document.querySelector('#app');
  app.innerHTML = '';

  // Animation
  // const animation = document.createElement('img')
  // animation.src =

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
};
