import { random } from '../../../utils';
import { inventoryModal } from '../Inventory/inventory';
import { addNoteToCollectables } from '../../../data/localStorage/LS';
import { notes, stage1, stage2, stage3, tickets } from '../Class/Objects';
import './Prints.css';

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! TESTING ZONE ------> HUD for Progression test

const Progression = () => {
  let room = document.querySelector('#room');

  let progress = document.createElement('aside');
  progress.classList = 'progress';

  progress.innerHTML = `
		<div check="1"></div>
		<div check="2"></div>
		<div check="3"></div>
	`;

  room.appendChild(progress);
};

function checkProgressPhases() {
  let phases = document.querySelectorAll('[check]');
  let stage = document.querySelector('#room').getAttribute('progression');
  phases.forEach((phase) => phase.getAttribute('check') == stage - 1 && phase.classList.add('completed'));

  Array.from(phases).every((phase) => phase.classList.contains('completed')) &&
    alert('Temporary progression system ended ');
}

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! TESTING ZONE ------> HUD for Progression test

export function itemsPrintOnStage(stage) {
  switch (stage) {
    case 0:
      activesPrint(stage1);
      break;
    case 1:
      activesPrint(stage2);
      break;
    case 2:
      polaroidPrint(stage3);
      break;
  }
  // Tickets and Note
  stage < 1 && ticketAndNotePrint(tickets, notes);
  // Set Next Stage
  document.querySelector('#room').setAttribute('progression', stage + 1);
}

function itemPop(src, parent) {
  let item = document.createElement('img');
  item.src = 'src/assets/images/icons/active/object-found.png';
  item.className = 'item';

  let colliderPosition = parent.getBoundingClientRect();

  item.style.top = `${colliderPosition.top}px`;
  item.style.left = `${colliderPosition.left}px`;

  parent.appendChild(item);

  let collider = item.parentElement;
  collider.classList.add('clickable');

  collider.addEventListener('click', () => item.classList.add('found'));

  item.addEventListener('click', (e) => {
    let collider = e.target.closest('div');
    item.remove();

    // Add to Inventory
    addItemToInventory(src);

    // Polaroid & Ticket
    let active = document.querySelectorAll('#inventory-active .item-inv img');

    let polaroid = active[active.length - 2];
    let ticket = active[active.length - 1];

    collider.id === 'ticket' && (ticket.src = src);
    collider.id === 'polaroid' && (polaroid.src = src);

    // Stage Controller
    let stage = document.querySelector('#room').getAttribute('progression');
    let check = Array.from(document.querySelectorAll(`[stage="${stage}"]`)).filter((item) => item.childElementCount);

    if (collider.getAttribute('stage') && check.length === 0) {
      itemsPrintOnStage(Number(stage));
      checkProgressPhases();
    }
  });
}

function addItemToInventory(item) {
  let actives = document.querySelectorAll('[id^="inventory"] img');
  let pattern = /([a-zA-Z]*?[0-9]*)(?=\.|\-)/;

  item.match(pattern)[0].length === 1
    ? addNoteToCollectables(item)
    : actives.forEach((active) => {
        if (active.src.match(pattern)[0].at(0) === item.match(pattern)[0].at(0)) {
          let parent = active.parentElement;
          // In inventory
          active.classList.add('got');
          // Examine
          parent.addEventListener('click', () => inventoryModal(item));
        }
      });
}

function polaroidPrint(stage) {
  let colliders = Array.from(document.querySelectorAll(`${stage3.query}`));
  let room = document.querySelector('#room').getAttribute('room');
  let polaroid = stage.items.filter((polaroid) => polaroid.includes(room));
  itemPop(polaroid[0], colliders[random(colliders.length, 1)]);
}

function activesPrint(stage) {
  let colliders = document.querySelectorAll(`${stage.query}`);
  let positions = random(colliders.length, stage.items.length);
  stage.items.forEach((item, index) => {
    let element = document.querySelector(`#${colliders[positions[index]].getAttribute('id')}`);
    itemPop(item, element);
  });
}

function ticketAndNotePrint(...elements) {
  [...elements].forEach((item) => {
    let element = document.querySelector(`${item.query}`);
    let pack = item.items;
    let target = Math.floor(Math.random() * pack.length);
    itemPop(pack[target], element);
  });
}

export default Progression;
