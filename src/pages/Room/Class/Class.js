import { playSound } from '../../../components/audio/Audio';
import { fisherYatesShuffle, soundFadeOut } from '../../../utils';
import { itemsPrintOnStage } from '../Progression/Progression';

class Stage {
  constructor(roomJSON) {
    this.roomJSON = roomJSON;
  }

  printRoom() {
    let background = document.createElement('img');
    background.src = this.roomJSON.backgroundImage;
    background.id = 'background';

    let room = document.querySelector('#room');

    room.setAttribute('room', this.roomJSON.room);
    room.setAttribute('progression', 0);

    room.appendChild(background);

    this.roomJSON.items.forEach((item) => {
      let identity = item.itemImage.match(/[a-z]*(?=\.)/);

      let object = document.createElement('img');
      object.className = identity;
      objectAssign(object, item.itemImage, item.itemPosition.y, item.itemPosition.x, item.size);

      let collider = document.createElement('div');
      collider.id = identity;
      colliderAssign(
        collider,
        item.colliderPosition.y,
        item.colliderPosition.x,
        item.colliderSize.w,
        item.colliderSize.h
      );

      pointerHandlers(object, collider, item);

      // Conditionals
      !item.hiddenOnPrint && room.appendChild(object);
      room.appendChild(collider);
    });

    // Random Items Assignment
    assignStagesItems();

    // Start Game
    let start = room.getAttribute('progression');
    itemsPrintOnStage(Number(start));
  }
}

function objectAssign(object, src, y, x, size) {
  object.src = src;
  object.style.top = y;
  object.style.left = x;
  object.style.width = size;
}

function colliderAssign(collider, y, x, width, height) {
  collider.style.top = y;
  collider.style.left = x;
  collider.style.width = width;
  collider.style.height = height;
}

function pointerHandlers(object, collider, item) {
  let room = document.querySelector('#room');

  collider.addEventListener('click', () => {
    object.classList.toggle('active');

    item.hiddenOnPrint && object.remove();

    if (object.classList.contains('active')) {
      let sound = new Audio(item.itemSound);
      playSound(sound);
      soundFadeOut(sound);

      object.addEventListener('transitionend', () => {
        let rect = object.getBoundingClientRect();
        colliderAssign(collider, `${rect.top}px`, `${rect.left}px`, `${rect.width}px`, `${rect.height}px`);
      });

      item.disappearOnClick && object.remove();
      item.hiddenOnPrint && room.append(object);
    }
  });
}

export function assignStagesItems() {
  let actives = document.querySelectorAll('#room > div:not(#note):not(#ticket):not(#console)');
  let shuffled = fisherYatesShuffle(Array.from(actives)).map((element) => element.getAttribute('id'));

  const probabilities = [0.3, 0.7];

  for (let i = 0; i < shuffled.length; i++) {
    if (i < shuffled.length * probabilities[0]) {
      let element = document.querySelector(`#${shuffled[i]}`);
      element.setAttribute('stage', '1');
    } else if (i < shuffled.length * probabilities[1]) {
      let element = document.querySelector(`#${shuffled[i]}`);
      element.setAttribute('stage', '2');
    } else {
      let element = document.querySelector(`#${shuffled[i]}`);
      element.setAttribute('stage', '3');
    }
  }
}

export default Stage;
