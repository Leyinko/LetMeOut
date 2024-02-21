import Button from '../button/Button';
import './Modal.css';

const createModal = (id, parent) => {
  const modal = document.createElement('article');
  modal.id = `${id}-modal`;
  modal.className = 'modal';

  modal.classList.add('on');

  Button('', 'close-modal-button', 'submit', modal);
  
  parent.append(modal);
};

export default createModal;
