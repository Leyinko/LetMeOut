import './ModalContent.css';

const modalContent = (id, modalContent) => {
  const modal = document.getElementById(`${id}-modal`);

  for (const item of modalContent) {
    if (item.endsWith('.svg') || item.endsWith('.png')) {
      const imageContainer = document.createElement('div');
      imageContainer.classList = 'imageModal';

      const image = document.createElement('img');
      image.src = item;
      image.alt = item.match(/\/([^/]+)\.[^.]+$/)[1];

      imageContainer.append(image);
      modal.append(imageContainer);
    } else {
      const paragraph = document.createElement('p');
      paragraph.classList = 'paragraphModal';
      paragraph.textContent = item;
      modal.append(paragraph);
    }
  }
};

export default modalContent;
