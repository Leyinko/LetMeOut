import { getCollectables } from '../../../localStorage/LS';
import { actives, notes } from '../../../pages/Room/Class/Objects';
import './inventory.css';

export function Inventory(type) {
  // Room
  const app = document.getElementById('app');

  const inventoryContainer = document.createElement('div');
  inventoryContainer.id = `inventory-${type}`;

  if (type === 'active') {
    actives.forEach((item) => iconItem(item, type, inventoryContainer));
  } else {
    inventoryContainer.addEventListener('click', (e) => {
      // Toggle
      inventoryContainer.classList.toggle('show');
      collectablesDropdown(e, type);
    });
  }

  app.appendChild(inventoryContainer);
}

function collectablesDropdown(e, type) {
  if (e.target.classList.contains('show')) {
    const collection = document.createElement('div');
    collection.id = 'collection';

    e.target.appendChild(collection);

    notes.items.forEach((item) => iconItem(item, type, collection));

    let collected = getCollectables();
    collected.forEach((note) => note && document.querySelector(`#note-${note} img`).classList.add('got'));
  } else {
    document.querySelector('#collection').remove();
  }
}

function inventoryModal(image) {
  const modalContainer = document.createElement('div');
  modalContainer.className = 'item-modal';

  const item = document.createElement('img');
  item.src = image;

  modalContainer.appendChild(item);

  modalContainer.addEventListener('click', () => modalContainer.remove());

  app.appendChild(modalContainer);
}

function iconItem(item, type, parent) {
  const object = document.createElement('div');
  object.className = 'item-inv';
  object.id = type == 'active' ? 'active' : `note-${item.match(/\d/)[0]}`;

  const icon = document.createElement('img');
  icon.src = item;

  icon.addEventListener('click', () => inventoryModal(item));

  object.appendChild(icon);
  parent.appendChild(object);
}
