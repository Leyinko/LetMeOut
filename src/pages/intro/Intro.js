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

  // Create & Show Modal Headphones
  const headphonesModal = document.createElement('article');
  headphonesModal.id = 'headphones-modal';
  headphonesModal.className = 'modal';
  headphonesModal.classList.add('on');
  intro.append(headphonesModal);

  modalContent('headphones', headphones);

  intro.addEventListener(
    'click',
<<<<<<< HEAD
    (e) => {
      console.log(e.target);
      closeModal('headphones');
      closeModal('instructions');
      closeModal('credits');
    },
    // NB : Render x-times
=======
    () => {
      closeModal('headphones');
    },
>>>>>>> 53ed6e87e2554f026d2a028a779c82ce73aba46e
    { once: true }
  );
};

// > OUTSIDE

export const closeModal = (id) => {
  const modal = document.getElementById(`${id}-modal`);

  if (modal) {
    modal.classList.remove('on');
    modal.classList.add('off');

    modal.addEventListener('animationend', () => {
      modal.remove();
      Main();
    });
  }
};

export const Main = () => {
  const intro = document.getElementById('intro');

  title('LET ME OUT', 'let-me-out', intro);
  menuField(intro);
  Version('V1.0', intro);
};
