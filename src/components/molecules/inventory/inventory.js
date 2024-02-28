import './inventory.css';

const app = document.getElementById('app');

export default function Inventory(items, id) {
  const inventoryContainer = document.createElement('div');
  inventoryContainer.id = id;

  items.forEach((element) => {
    const inventoryElement = document.createElement('div');
    inventoryElement.className = 'inventory-element';

    const iconInventory = document.createElement('img');
    iconInventory.classList.add('inventory-icon');
    iconInventory.src = element.src;

    inventoryElement.addEventListener('click', () => {
      if (element.click) {
        if (id == 'dropdown-note') {
          const notesInventory = document.querySelector('#note-inventory');
          notesInventory.style.display = notesInventory.style.display == 'grid' ? 'none' : 'grid';
        } else {
          console.log('furula');
          inventoryModal(element.src);
        }
      }
    });

    inventoryElement.appendChild(iconInventory);
    inventoryContainer.appendChild(inventoryElement);
  });

  app.appendChild(inventoryContainer);
}

function inventoryModal(image) {
  const modalContainer = document.createElement('div');
  modalContainer.className = 'inventory-modal';

  const modal = `
      <div class='note-gallery'>
        <button class='close-gallery'>X</button>
        <img class='gallery-image' src='${image}'/>
      </div>
    `;

  modalContainer.innerHTML = modal;

  app.appendChild(modalContainer);

  if (modalContainer) {
    const closeButton = document.querySelector('.close-gallery');

    console.log(closeButton);
    closeButton.addEventListener('click', () => app.removeChild(modalContainer));
  }
}
