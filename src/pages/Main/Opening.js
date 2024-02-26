import Loader from '../../components/atoms/loader/Loader';
import Main from './utils/Main/Main';
import './Opening.css';

const Launch = () => {
  // App
  const app = document.querySelector('#app');
  // Audio
  const audio = document.createElement('audio');
  audio.src = 'src/assets/audio/music/Main-soundtrack.mp3';
  audio.loop = true;
  audio.volume = 0.6;
  app.appendChild(audio);
  // Start

  // Loader
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
    headphonesModal(app);
  }, 9000);
};

function warningScreen(app) {
  const warning = document.createElement('div');
  warning.id = 'warning';

  warning.innerHTML = `
    <h3>WARNING</h3>
    <p>The motion pictures contained in this video game are protected under the copyright laws of the United States and Other countries. This diskette is sold for home use only and all Other rights are expressly reserved by the copyright owner of such motion pictures.
    Any copying or public performance of such motion pictures is strictly prohibited and may subject the offender to civil liability and severe criminal penalties.</p>
    <span>(title 17, United States Code, Section 501 and 506)</span>
  `;

  app.appendChild(warning);
}

function headphonesModal(app) {
  const headphonesModal = document.createElement('div');
  headphonesModal.id = 'headphones-modal';

  headphonesModal.innerHTML = `
    <img src="src/assets/images/icons/menu/headphones.png">
    <p>We recommend the use of Headphones for a better experience.</p>
    <span>Click to continue</span>
  `;

  app.appendChild(headphonesModal);

  const click = document.querySelector('#headphones-modal span');
  click.addEventListener('click', () => {
    document.querySelector('audio').play();
    headphonesModal.remove();
    // Main Menu
    Main();
  });
}

export default Launch;
