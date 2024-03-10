import { audioConfig } from '../../components/audio/Audio';
import BATHROOM from './Levels/1F/Bathroom/Bathroom';
import Stage from './Class/Class';
import Progression from './Progression/Progression';
import { clickCount, statsCollector } from '../../data/localStorage/LS';
import Terminal from './Console/Console';
import { Inventory } from './Inventory/inventory';
import './Room.css';

export const Room = () => {
  // App
  const app = document.querySelector('#app');

  // Game duration Stamp
  const start = new Date().getTime();

  // Room
  const room = document.createElement('section');
  room.id = 'room';
  app.append(room);

  // Audio
  const soundtrack = new Audio('src/assets/audio/music/The-Prospector.mp3');
  audioConfig(soundtrack, false, true, 0.4);

  // Print Room
  let level = new Stage(BATHROOM);
  level.printRoom();

  // NB : Object/Collider Test
  // const object = document.createElement('img');
  // object.className = 'object';
  // object.src = 'src/assets/images/pictures/1F/pointers/console.gif';

  // const collider = document.createElement('div');
  // collider.className = 'collider';

  // app.append(object, collider);
  // NB : Object/Collider Test

  // Console
  Terminal(app);

  // Stages Test
  Progression();

  // NB : Hands Test
  // const gif = document.createElement('img');
  // gif.src = 'src/assets/images/pictures/lobby/Hands-1-2.gif';
  // gif.className = 'gif';
  // app.appendChild(gif);
  // NB : Hands Test

  // Inventory
  room.addEventListener(
    'animationend',
    () => {
      Inventory('active', room);
      Inventory('passive', room);
    },
    { once: true }
  );

  // Click Counter
  document.addEventListener('click', () => statsCollector('clickCount', 'clicks'));
};

export function timer(stamp) {
  let now = new Date().getTime();
  let time = Math.floor((now - stamp) / 1000);
  return time;
}

export default Room;
