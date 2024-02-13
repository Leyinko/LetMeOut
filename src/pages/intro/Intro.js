import Version from '../../components/atoms/Version/Version';
import createModal from '../../components/atoms/modal/Modal';
import './Intro.css';

const headphones = ['../../../src/assets/images/icons/menu/headphones.png', 'USE HEADPHONES', 'FOR BETTER EXPERIENCE']

export const Intro = () => {
  // App
  const app = document.querySelector('#app');

  // Intro
  const intro = document.createElement('section');
  intro.id = 'intro';
  app.append(intro);

  createModal('headphones', headphones, 'intro'); 
  
  window.addEventListener('click', closeModal())
  
  Version('V1.0', intro);
};

const fadeIn = (element, duration) => {
    let opacity = 0;
    const interval = 10;
    const delta = 1 / (duration / interval);

    const timer = setInterval(() => {
        opacity += delta;
        element.style.opacity = opacity;
        if (opacity >= 1) {
            clearInterval(timer)
        }
    }, interval)
}
