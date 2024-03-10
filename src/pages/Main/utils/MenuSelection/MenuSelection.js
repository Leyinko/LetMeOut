import { Lobby } from '../../../Lobby/Lobby';
import Menu from '../../../../components/menu/Menu';
import createModal from '../Modal/Modal';
import { playSound } from '../../../../components/audio/Audio';
import './MenuSelection.css';

const selectionSound = new Audio('../../../../src/assets/audio/sounds/main/Menu-hover.mp3');

const menuSelection = (parent) => {
  const menuField$ = document.createElement('div');
  menuField$.id = 'menu-field';

  Menu('NEW GAME', 'start-menu', menuField$);
  Menu('SCORES', 'scores-menu', menuField$);
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
        selected === 'scores' && createModal('scores', parent);
        selected === 'credits' && createModal('credits', parent);
      }
    });
  });
};

export default menuSelection;
