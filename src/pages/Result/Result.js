import Menu from '../../components/menu/Menu';
import Main from '../Main/utils/Main/Main';
import './Result.css';

export const Win = () => {
  // App
  const app = document.querySelector('#app');

  const result = document.createElement('section');
  result.id = 'result';
  app.append(result);

  let message = document.createElement('h1');
  message.textContent = 'Congratulations!';

  result.appendChild(message);

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

  const result = document.createElement('section');
  result.id = 'result';
  app.append(result);

  let message = document.createElement('h1');
  message.textContent = 'Game Over';

  result.appendChild(message);

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
