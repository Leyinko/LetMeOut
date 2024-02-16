import title from '../../components/atoms/Title/Title';
import Version from '../../components/atoms/Version/Version';
import createModal from '../../components/atoms/modal/Modal';
import modalContent from '../../components/atoms/modalContent/ModalContent';
import menuField from '../../components/molecules/menuField/MenuField';
import './Intro.css';

const headphones = ['../../../src/assets/images/icons/menu/headphones.png', 'USE HEADPHONES', 'FOR BETTER EXPERIENCE'];

// > INSIDE

export const Intro = () => {
  // App
  const app = document.querySelector('#app');

  // Intro
  const intro = document.createElement('section');
  intro.id = 'intro';
  app.append(intro);

  intro.addEventListener('click', () => closeModalHeadphones(), { once: true });

  // Show Modal
  createModal('headphones', intro);
  modalContent('headphones', headphones);
};

// > OUTSIDE

const closeModalHeadphones = () => {
  const headphonesModal = document.getElementById('headphones-modal');
  const intro = document.querySelector('#intro');

  headphonesModal.classList.remove('on');
  headphonesModal.classList.add('off');

  headphonesModal.addEventListener('animationend', () => {
    headphonesModal.remove();
    title('LET ME OUT', 'let-me-out', intro);
    menuField(intro);
    Version('V1.0', intro);
  });
};
