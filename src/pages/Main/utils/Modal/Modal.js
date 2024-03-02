import Button from '../../../../components/atoms/button/Button';
import { modals_main_template } from '../Text';
import './Modal.css';

const createModal = (id, parent) => {
  const modal = document.createElement('article');
  modal.id = `${id}-modal`;
  modal.className = 'modal';

  modal.innerHTML = modals_main_template[id];

  Button('X', 'close-modal-button', 'close-modal-main', 'button', modal);

  parent.append(modal);

  const close = document.querySelector('.close-modal-button');
  close.addEventListener('click', () => modal.remove());
};

export default createModal;
