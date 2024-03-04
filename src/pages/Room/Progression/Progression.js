import { random } from '../../../../utils';
import { addNoteToCollectables } from '../../../localStorage/LS';
import { notes, stage1, stage2, stage3, tickets } from '../Class/Objects';
import './Progression.css';

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
    alert('Congratulations you are free from Luca for a few days, do not get used of it...');
}

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! TESTING ZONE ------> HUD for Progression test

export function itemsPrintOnStage(stage) {
  switch (stage) {
    case 0:
      let first = document.querySelectorAll(`${stage1.query}`);
      itemPop(stage1.items, first[random(first.length)]);
      break;
    case 1:
      let second = Array.from(document.querySelectorAll(`${stage2.query}`));
      stage2.items.forEach((item) => {
        let element = document.querySelector(`#${second[random(second.length)].getAttribute('id')}`);
        itemPop(item, element);
      });
      break;
    case 2:
      let third = Array.from(document.querySelectorAll(`${stage3.query}`));
      let room = document.querySelector('#room').getAttribute('room');
      let polaroid = stage3.items.filter((polaroid) => polaroid.includes(room));
      itemPop(polaroid[0], third[random(third.length)]);
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

    addItemToInventory(src);

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
    : actives.forEach(
        (active) => active.src.match(pattern)[0].at(0) === item.match(pattern)[0].at(0) && active.classList.add('got')
      );
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
