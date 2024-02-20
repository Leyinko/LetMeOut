import './Modal.css';

const createModal = (id, parent) => {
  const modal = document.createElement('article');
  modal.id = `${id}-modal`;
  modal.className = 'modal';

  modal.classList.add('on');

  parent.append(modal);
};

export default createModal;
