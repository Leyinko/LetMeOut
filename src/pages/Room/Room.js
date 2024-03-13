import BATHROOM from './Levels/1F/Bathroom/Bathroom';
import Stage from './Class/Class';
import Terminal from './Console/Console';
import { firstClickStart } from './Progression/Progression';
import Progression from './Prints/Prints';
import { statsCollector } from '../../data/localStorage/LS';
import './Room.css';

export const Room = () => {
  // App
  const app = document.querySelector('#app');

  // Game Duration Stamp
  const start = new Date().getTime();

  // Room
  const room = document.createElement('section');
  room.id = 'room';
  app.append(room);

  // Print Room
  let level = new Stage(BATHROOM);
  level.printRoom();

  // Console
  Terminal(app);

  // Start First Click
  room.addEventListener('animationend', () => firstClickStart(), { once: true });

  // NB : Object/Collider Test
  // const object = document.createElement('img');
  // object.className = 'object';
  // object.src = 'src/assets/images/pictures/1F/pointers/console.gif';

  // const collider = document.createElement('div');
  // collider.className = 'collider';

  // app.append(object, collider);
  // NB : Object/Collider Test

  // NB : Stages Test
  Progression();
  // NB : Stages Test

  // Stats
  clicksStats();
};

const clicksStats = () => document.addEventListener('click', () => statsCollector('clickCount', 'clicks'));

export function timer(stamp) {
  let now = new Date().getTime();
  let time = Math.floor((now - stamp) / 1000);
  return time;
}

export default Room;
