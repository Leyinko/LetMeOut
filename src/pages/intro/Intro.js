import Version from '../../components/atoms/Version/Version';
import Audio from '../../components/atoms/audio/Audio';
import createModal from '../../components/atoms/modal/Modal';
import menuField from '../../components/molecules/menuField/MenuField';
import './Intro.css';

const headphones = ['../../../src/assets/images/icons/menu/headphones.png', 'USE HEADPHONES', 'FOR BETTER EXPERIENCE'];

export const Intro = () => {
  // App
  const app = document.querySelector('#app');

  // Intro
  const intro = document.createElement('section');
  intro.id = 'intro';
  app.append(intro);

  // Title
  const title = document.createElement('h1');
  title.id = 'let-me-out';
  title.textContent = 'LET ME OUT';
  title.style.opacity = 0;
  intro.append(title);

  // Menu
  menuField();

  // Show Modal HeadPhones
  showModalHeadphones();

  const handleClick = () => {
    closeModalHeadphones();
    window.removeEventListener('click', handleClick);
  };

  window.addEventListener('click', handleClick);

  Version('V1.0', intro);
};

const showModalHeadphones = () => {
  createModal('headphones', headphones);

  const headphonesModal = document.getElementById('headphones-modal');

  fadeIn(headphonesModal, 3000);
};

const closeModalHeadphones = () => {
  const headphonesModal = document.getElementById('headphones-modal');
  fadeOut(headphonesModal, 5000);

  Audio('../../../src/assets/audio/music/Main-soundtrack.mp3', true, true);

  // const bg = document.querySelector('#intro::after');
  // bg.style.filter = 'none';

  setTimeout(() => {
    const title = document.getElementById('let-me-out');
    const menu = document.getElementById('menu-field');
    
    fadeIn(title, 5000);
    fadeIn(menu, 5000);
  }, 5000);

};


const fadeIn = (element, duration) => {
  let opacity = 0;
  const interval = 100;
  const delta = 1 / (duration / interval);

  const timer = setInterval(() => {
    opacity += delta;
    element.style.opacity = opacity;
    if (opacity >= 1) {
      clearInterval(timer);
    }
  }, interval);
};

const fadeOut = (element, duration) => {
  let opacity = 1;
  const interval = 100;
  const delta = 1 / (duration / interval);

  const timer = setInterval(() => {
    opacity -= delta;
    element.style.opacity = opacity;
    if (opacity <= 0) {
      clearInterval(timer);
      element.style.display = 'none';
    }
  }, interval);
};
