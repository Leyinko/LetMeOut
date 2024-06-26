import Main from './utils/Main/Main';
import Loader from '../../components/loader/Loader';
import { immersion_message, opening_warning } from './utils/Text';
import { audioConfig } from '../../components/audio/Audio';
import './Opening.css';

const Launch = () => {
  // App
  const app = document.querySelector('#app');

  Loader(app);

  setTimeout(() => {
    document.querySelector('.loader').remove();
  }, 2000);
  setTimeout(() => {
    warningScreen(app);
  }, 3000);
  setTimeout(() => {
    warning.remove();
  }, 7000);
  setTimeout(() => {
    immersionModal(app);
  }, 9000);
};

function warningScreen(app) {
  const warning = document.createElement('div');
  warning.id = 'warning';

  warning.innerHTML = `
    <h3>${opening_warning.warning}</h3>
    <p>${opening_warning.content}</p>
    <span>${opening_warning.laws}</span>
  `;

  app.appendChild(warning);
}

function immersionModal(app) {
  const immersionModal = document.createElement('div');
  immersionModal.id = 'immersion';

  immersionModal.innerHTML = `
    <img src="${immersion_message.image}">
    <p>${immersion_message.content}</p>
    <span>${immersion_message.continue}</span>
  `;

  app.appendChild(immersionModal);

  const click = document.querySelector('#immersion span');
  click.addEventListener('click', () => {
    immersionModal.remove();

    setTimeout(() => toMain(app), 1000);
  });
}

export function toMain(app) {
  // Main Menu
  Main();
  // Audio
  const audio = document.createElement('audio');
  audio.src = '/assets/audio/music/Main-soundtrack.mp3';
  audioConfig(audio, true, true, 0.7);

  app.appendChild(audio);
  // FullScreen
  !document.fullscreenElement && document.documentElement.requestFullscreen();
}

export default Launch;
