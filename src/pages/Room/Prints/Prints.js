import { random } from '../../../utils';
import { addItemToInventory } from '../Inventory/inventory';
import { notes, stage1, stage2, stage3, tickets } from '../Class/Objects';
import './Prints.css';

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
  item.src = '/assets/images/icons/active/object-found.png';
  item.className = 'item';

  let colliderPosition = parent.getBoundingClientRect();

  item.style.top = `${colliderPosition.top}px`;
  item.style.left = `${colliderPosition.left}px`;

  parent.appendChild(item);

  let collider = item.parentElement;
  collider.classList.add('clickable');

  collider.addEventListener('click', () => item.classList.add('found'));

  item.addEventListener('click', (e) => {
    let active = document.querySelectorAll('#inventory-active .item-inv img');
    let collider = e.target.closest('div');

    item.remove();

    // Add to Inventory
    addItemToInventory(src);

    // Polaroid & Ticket to Inventory
    let polaroid = active[active.length - 2];
    let ticket = active[active.length - 1];
    let pattern = /([a-zA-Z]*?[0-9]*)(?=\.png|\-)/;

    collider.id === 'ticket' && (ticket.src = src);
    src.match(pattern)[0] === 'Polaroid' && (polaroid.src = src);
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
