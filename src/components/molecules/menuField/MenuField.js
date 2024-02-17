import { Lobby } from '../../../pages/Lobby/Lobby';
import Audio, { playSound } from '../../atoms/audio/Audio';
import Menu from '../../atoms/menu/Menu';
import createModal from '../../atoms/modal/Modal';
import modalContent from '../../atoms/modalContent/ModalContent';
import './MenuField.css';

const hoverMenu = Audio('../../../../src/assets/audio/sounds/main/Menu-hover.mp3');
const instructionsMenu = ['Esto es una prueba para el modal del menu', 'a ver si funciona correctamente'];
const creditsMenu = ['Manu', 'Luca', 'Jeni'];

const menuField = (parent) => {
  const menuField$ = document.createElement('div');
  menuField$.id = 'menu-field';

  Menu('START', 'start-menu', menuField);
  Menu('INSTRUCTIONS', 'instructions-menu', menuField);
  Menu('CREDITS', 'credits-menu', menuField);

  parent.append(menuField$);

  // let menuIntro = document.querySelectorAll('[role="menu-select"]');

  // menuIntro.forEach((element) => {
  //   element.addEventListener('mouseenter', () => {
  //     playSound(hoverMenu);
  //   });

  //   if (element.classList.contains('start-menu')) {
  //     element.addEventListener('click', () => {
  //       Lobby();
  //     });
  //   } else if (element.classList.contains('instructions-menu')) {
  //     element.addEventListener('click', () => {
  //       createModal('instructionsMenu', parent);
  //       modalContent('instructionsMenuContent', instructionsMenu);
  //     });
  //   } else if (element.classList.contains('credits-menu')) {
  //     element.addEventListener('click', () => {
  //       createModal('creditsMenu', parent);
  //       modalContent('creditsMenuContent', creditsMenu);
  //     });
  //   }
  // });
};

export default menuField;
