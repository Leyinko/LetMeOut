import './Modal.css';

const createModal = (id, modalContent) => {
  // Create
  const modal = document.createElement('article');
  modal.id = `${id}-modal`;
  modal.classList = 'modal';

  // Content
  const content = document.createElement('div');
  content.className = 'modal-content';


  // Fill content
for (const item of modalContent) {
    if (typeof item === 'string' && (item.endsWith('.svg') || (item.endsWith('.png')))) {
        const imageContainer = document.createElement('div');
        imageContainer.classList = 'imageContainer';

        const image = document.createElement('img');
        image.src = item;
        image.alt = item.split('.')[0]; 
        
        imageContainer.appendChild(image);
        content.appendChild(imageContainer);
    }
    if(typeof item === 'string' && !(item.endsWith('.svg') || (item.endsWith('.png')))) {
        const paragraph = document.createElement('p');
        paragraph.textContent = item;
        content.appendChild(paragraph);
    }
}

  modal.append(content);

  const parent = document.querySelector('#intro');
  parent.append(modal);
};

export default createModal;


// TODO 
// - arreglar el alt de las imagenes