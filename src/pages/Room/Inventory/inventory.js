import { addNoteToCollectables, getCollectables } from '../../../data/localStorage/LS';
import { actives, notes } from '../Class/Objects';
import { unlockPathFromObject } from '../Progression/Progression';
import './inventory.css';

export function Inventory(type, parent) {
  const inventoryContainer = document.createElement('div');
  inventoryContainer.id = `inventory-${type}`;
  inventoryContainer.style.pointerEvents = 'all';

  if (type === 'active') {
    actives.forEach((item) => iconItem(item, type, inventoryContainer));
  } else {
    inventoryContainer.addEventListener('click', (e) => {
      // Toggle
      inventoryContainer.classList.toggle('show');
      collectablesDropdown(e, type);
    });
  }

  parent.appendChild(inventoryContainer);

  // Page
  inventoryContainer.parentElement.id === 'main' && (inventoryContainer.className = 'init-main');
}

function collectablesDropdown(e, type) {
  if (e.target.classList.contains('show')) {
    const collection = document.createElement('div');
    collection.id = 'collection';

    e.target.appendChild(collection);

    notes.items.forEach((item) => iconItem(item, type, collection));

    let collected = getCollectables();
    collected &&
      collected.forEach((page) => {
        if (page) {
          let note = document.querySelector(`#note-${page} img`);
          let parent = note.parentElement;
          // In inventory
          note.classList.add('got');
          // Examine
          parent.addEventListener('click', () => inventoryModal(note.src));
        }
      });
  } else {
    document.querySelector('#collection').remove();
  }
}

export function addItemToInventory(item) {
  let actives = document.querySelectorAll('[id^="inventory"] img');
  let pattern = /([a-zA-Z]*?[0-9]*)(?=\.|\-)/;

  item.match(pattern)[0].length === 1
    ? addNoteToCollectables(item)
    : actives.forEach((active, index) => {
        if (active.src.match(pattern)[0].at(0) === item.match(pattern)[0].at(0)) {
          let parent = active.parentElement;
          // In inventory
          active.classList.add('got');
          // Unlock
          unlockPathFromObject(index);
          // Examine
          parent.addEventListener('click', () => inventoryModal(item));
        }
      });
}

export function inventoryModal(image) {
  if (!document.querySelector('.item-modal')) {
    const modalContainer = document.createElement('div');
    modalContainer.className = 'item-modal';

    const item = document.createElement('img');
    item.src = image;

    modalContainer.appendChild(item);

    modalContainer.addEventListener('click', () => modalContainer.remove());

    app.appendChild(modalContainer);
  }
}

function iconItem(item, type, parent) {
  const object = document.createElement('div');
  object.className = 'item-inv';
  object.id = type == 'active' ? 'active' : `note-${item.match(/\d/)[0]}`;

  const icon = document.createElement('img');
  icon.src = item;

  object.appendChild(icon);
  parent.appendChild(object);
}
