import Button from '../../../../components/button/Button';
import { modals_main_template } from '../Text';
import './Modal.css';

const createModal = async (id, parent) => {
  const modal = document.createElement('article');
  modal.id = `${id}-modal`;
  modal.className = 'modal';

  modal.append(await modals_main_template[id]());

  Button('X', 'close-modal-button', 'close-modal-main', 'button', modal);

  parent.append(modal);

  const close = document.querySelector('.close-modal-button');
  close.addEventListener('click', () => modal.remove());
};

export default createModal;
