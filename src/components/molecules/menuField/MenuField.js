import { Lobby } from '../../../pages/Lobby/Lobby';
import { closeModal, Main } from '../../../pages/intro/Intro';
import Audio, { playSound } from '../../atoms/audio/Audio';
import Menu from '../../atoms/menu/Menu';
import createModal from '../../atoms/modal/Modal';
import modalContent from '../../atoms/modalContent/ModalContent';
import './MenuField.css';

const hoverMenu = Audio('../../../../src/assets/audio/sounds/main/Menu-hover.mp3');
const instructionsMenu = ['ESTO ES UNA PRUEBA PARA EL MODAL DEL MENU', 'A VER SI FUNCIONA CORRECTAMENTE'];
const creditsMenu = ['MANU', 'LUCA', 'JENI'];

const closeModalButton = (id) => {
  // const modal = document.getElementById(`${id}-modal`);
  const closeButton = document.querySelector('.close-modal-button');
  closeButton.addEventListener(
    'click',
    () => {
      closeModal(id);
      Main();
    },
    { once: true }
  );
};

const menuField = (parent) => {
  const intro = document.getElementById('intro');

  const menuField$ = document.createElement('div');
  menuField$.id = 'menu-field';

  Menu('START', 'start-menu', menuField$);
  Menu('INSTRUCTIONS', 'instructions-menu', menuField$);
  Menu('CREDITS', 'credits-menu', menuField$);

  parent.append(menuField$);

  let menuIntro = document.querySelectorAll('[role="menu-select"]');

  menuIntro.forEach((element) => {
    element.addEventListener('mouseenter', () => {
      playSound(hoverMenu);
    });

    if (element.classList.contains('start-menu')) {
      element.addEventListener('click', () => {
        app.innerHTML = '';
        Lobby();
      });
    } else if (element.classList.contains('instructions-menu')) {
      element.addEventListener('click', () => {
        intro.innerHTML = '';
        createModal('instructions', intro);
        modalContent('instructions', instructionsMenu);
        closeModalButton('instructions');
      });
    } else if (element.classList.contains('credits-menu')) {
      element.addEventListener('click', () => {
        intro.innerHTML = '';
        createModal('credits', intro);
        modalContent('credits', creditsMenu);
        closeModalButton('credits');
      });
    }
  });
};

export default menuField;
