import { Lobby } from '../../../Lobby/Lobby';
import Menu from '../../../../components/atoms/menu/Menu';
import createModal from '../Modal/Modal';
import { playSound } from '../../../../components/atoms/audio/Audio';
import './MenuSelection.css';

const selectionSound = new Audio('../../../../src/assets/audio/sounds/main/Menu-hover.mp3');

const menuSelection = (parent) => {
  const menuField$ = document.createElement('div');
  menuField$.id = 'menu-field';

  Menu('START', 'start-menu', menuField$);
  Menu('INSTRUCTIONS', 'instructions-menu', menuField$);
  Menu('CREDITS', 'credits-menu', menuField$);

  parent.append(menuField$);

  let selections = document.querySelectorAll('[role="menu-select"]');
  selections.forEach((selection) => {
    selection.addEventListener('click', (e) => {
      let selected = e.target.className.match(/[a-z]*(?=-)/)[0];
      let modal = document.querySelector('.modal');
      // Click Sound
      playSound(selectionSound);
      if (!modal) {
        if (selected === 'start') {
          // Reset Previous Section
          document.querySelector('section').remove();
          // Lobby
          Lobby();
        }
        selected === 'instructions' && createModal('instructions', parent);
        selected === 'credits' && createModal('credits', parent);
      }
    });
  });
};

export default menuSelection;
