import { notes, stage1, stage2, stage3, tickets } from '../Class/Objects';
import './Progression.css';

// TESTING ZONE ------> HUD for Progression test
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
// TESTING ZONE ------> HUD for Progression test

export function itemsPrintOnStage(stage) {
  switch (stage) {
    case 0:
      let first = document.querySelectorAll(`${stage1.query}`);
      itemPop(stage1.items, first[0]);
      break;
    case 1:
      let second = Array.from(document.querySelectorAll(`${stage2.query}`));
      stage2.items.forEach((item, index) => {
        let element = document.querySelector(`#${second[index].getAttribute('id')}`);
        itemPop(item, element);
      });
      break;
    case 2:
      let third = Array.from(document.querySelectorAll(`${stage3.query}`));
      let room = document.querySelector('#room').getAttribute('room');
      let polaroid = stage3.items.filter((polaroid) => polaroid.includes(room));
      itemPop(polaroid, third[0]);
      break;
  }
  // Tickets and Note
  stage < 1 && ticketAndNotePrint(tickets, notes);
  // Set Next Stage
  document.querySelector('#room').setAttribute('progression', stage + 1);
}

function itemPop(src, parent) {
  let item = document.createElement('img');
  item.src = src;
  item.className = 'item';
  parent.appendChild(item);

  let collider = item.parentElement;
  collider.classList.add('clickable');
  collider.addEventListener('click', () => item.classList.add('found'));

  item.addEventListener('click', (e) => {
    let collider = e.target.closest('div');
    item.remove();

    let stage = document.querySelector('#room').getAttribute('progression');
    let check = Array.from(document.querySelectorAll(`[stage="${stage}"]`)).filter((item) => item.childElementCount);

    if (collider.getAttribute('stage') && check.length === 0) {
      itemsPrintOnStage(Number(stage));
      checkProgressPhases();
    }
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
