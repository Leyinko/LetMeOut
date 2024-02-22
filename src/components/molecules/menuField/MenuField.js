import { Lobby } from '../../../pages/Lobby/Lobby';
<<<<<<< HEAD
import { playSound } from '../../atoms/audio/Audio';
=======
import { closeModal, Main } from '../../../pages/intro/Intro';
import Audio, { playSound } from '../../atoms/audio/Audio';
>>>>>>> 53ed6e87e2554f026d2a028a779c82ce73aba46e
import Menu from '../../atoms/menu/Menu';
import createModal from '../../atoms/modal/Modal';
import modalContent from '../../atoms/modalContent/ModalContent';
import './MenuField.css';

<<<<<<< HEAD
const hoverMenu = new Audio('../../../../src/assets/audio/sounds/main/Menu-hover.mp3');
const instructionsMenu = ['ESTO ES UNA PRUUEBA PARA EL MODAL DEL MENU', 'A VER SI FUNCIONA CORRECTAMENTE'];
=======
const hoverMenu = Audio('../../../../src/assets/audio/sounds/main/Menu-hover.mp3');
const instructionsMenu = ['ESTO ES UNA PRUEBA PARA EL MODAL DEL MENU', 'A VER SI FUNCIONA CORRECTAMENTE'];
>>>>>>> 53ed6e87e2554f026d2a028a779c82ce73aba46e
const creditsMenu = ['MANU', 'LUCA', 'JENI'];

const closeModalButton = (id) => {
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
