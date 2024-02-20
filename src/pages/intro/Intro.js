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

  // Show Modal
  createModal('headphones', intro);
  modalContent('headphones', headphones);

  intro.addEventListener('click', () => {
    closeModal('headphones');
    closeModal('instructions');
    closeModal('credits');
  });
};

// > OUTSIDE

const closeModal = (id) => {
  const modal = document.getElementById(`${id}-modal`);
  console.log(modal);
  const intro = document.getElementById('intro');

  modal.classList.remove('on');
  modal.classList.add('off');

  modal.addEventListener('animationend', () => {
    modal.remove();
    title('LET ME OUT', 'let-me-out', intro);
    menuField(intro);
    Version('V1.0', intro);
  });
};
