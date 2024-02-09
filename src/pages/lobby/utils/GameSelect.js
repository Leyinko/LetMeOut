import Audio, { playSound } from '../../../components/atoms/audio/Audio';
import UserFieldsModal from './UserFieldsModal';

const selectionSound = Audio('../../../../src/assets/audio/sounds/main/Menu-hover.mp3');

const GameSelect = (title, id, ...fields) => {
  const menu = document.createElement('article');
  menu.id = `${id}-party`;

  let title$$ = document.createElement('h1');
  title$$.setAttribute('role', 'lobby-menu');
  title$$.id = id;
  title$$.textContent = title;
  title$$.addEventListener('click', () => playSound(selectionSound));

  menu.appendChild(title$$);

  menu.addEventListener('click', (e) => {
    let selections = document.querySelectorAll('[role="lobby-menu"]');
    let active = document.querySelector('#fields-modal');

    selections.forEach((selection) => {
      if (active && active.contains(e.target)) return;

      if (selection === e.target) {
        selection.classList.add('active');
        UserFieldsModal(id.toUpperCase(), e.target.parentElement, fields);
      } else {
        selection.classList.remove('active');
        active && active.remove();
      }
    });
  });

  const main = document.querySelector('#lobby-main');
  main.appendChild(menu);
};

export default GameSelect;
