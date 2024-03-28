import { playSound } from '../../../../components/audio/Audio';
import UserFieldsModal from '../User/User';
import './Party.css';

const selectionSound = new Audio('../../../../assets/audio/sounds/main/Menu-hover.mp3');

const GameSelect = (title, id, ...fields) => {
  const container = document.createElement('article');
  container.id = `${id}-party`;

  let selection = document.createElement('h2');
  selection.setAttribute('role', 'lobby-menu');
  selection.id = id;
  selection.textContent = title;

  selection.addEventListener('click', () => playSound(selectionSound));

  container.appendChild(selection);

  selection.addEventListener('click', (e) => {
    let selections = document.querySelectorAll('[role="lobby-menu"]');
    let selected = document.querySelector('#fields-modal');
    let parent = e.target.parentElement;

    selections.forEach((selection) => {
      if (selected && selected.contains(e.target)) return;

      if (selection === e.target && !selection.classList.contains('active')) {
        selection.classList.add('active');
        UserFieldsModal(id.toUpperCase(), parent, fields);
      } else {
        selection.classList.remove('active');
        selected && selected.remove();
      }
    });
  });

  document.querySelector('#lobby-main').appendChild(container);
};

export default GameSelect;
