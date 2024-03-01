import Room from '../../../ROOMTEST/Room';
import { soundFadeOut } from '../../../utils';
import { audioConfig, playSound } from '../../components/atoms/audio/Audio';
import './Intro.css';

const Intro = () => {
  // App
  const app = document.querySelector('#app');

  // Intro
  const intro = document.createElement('section');
  intro.id = 'intro';
  app.append(intro);

  // Audio
  const audio = document.querySelector('audio');

  // Logo
  const logo = document.createElement('img');
  logo.src = 'src/assets/images/logos/IANA-logo.gif';
  intro.appendChild(logo);

  setTimeout(() => {
    audio.pause();
    logo.remove();
  }, 5000);

  // Date
  const date = document.createElement('h3');
  const location = document.createElement('span');

  date.textContent = 'October, 28, 1991';
  location.innerText = 'Krakow, Poland';

  setTimeout(() => {
    intro.append(date, location);

    audio.src = 'src/assets/audio/sounds/lobby/Intro.mp3';
    audio.loop = false;
    audio.play();

    audio.addEventListener('ended', () => {
      let section = document.querySelector('section');
      section.remove();

      Room();
    });
  }, 7000);
};

export function preIntro(confirm) {
  let audio = document.querySelector('audio');
  let readyButton = document.querySelector('.ready-button');

  readyButton.style.pointerEvents = 'none';

  playSound(confirm);
  soundFadeOut(confirm);

  setTimeout(() => audio.pause(), 1000);

  setTimeout(() => {
    audio.src = 'src/assets/audio/sounds/lobby/Clock-loading.mp3';
    audioConfig(audio, true, true, 0.9);
    readyButton.remove();
  }, 1000);

  setTimeout(() => {
    let section = document.querySelector('section');
    section.remove();
  }, 4500);

  setTimeout(() => Intro(), 5000);
}

export default Intro;
