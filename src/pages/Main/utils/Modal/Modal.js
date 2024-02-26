import Button from '../../../../components/atoms/button/Button';
import './Modal.css';

const createModal = (id, parent) => {
  const modal = document.createElement('article');
  modal.id = `${id}-modal`;
  modal.className = 'modal';

  modal.innerHTML = modalsMenusText[id];

  Button('X', 'close-modal-button', 'close-modal-main', 'button', modal);

  parent.append(modal);

  const close = document.querySelector('.close-modal-button');
  close.addEventListener('click', () => modal.remove());
};

const modalsMenusText = {
  credits: `<p>Jeni || Manu || Luca</p>`,
  instructions: `<span>Please be kind to your fellow players.. Animals first :3</span>`,
};

export default createModal;
