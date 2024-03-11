import { audioConfig, playSound } from '../../components/audio/Audio';
import BATHROOM from './Levels/1F/Bathroom/Bathroom';
import Stage from './Class/Class';
import { statsCollector } from '../../data/localStorage/LS';
import Terminal from './Console/Console';
import { Inventory } from './Inventory/inventory';
import Progression from './Prints/Prints';
import Countdown from '../../components/countdown/Countdown';
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
  room.addEventListener(
    'click',
    () => {
      let clock = new Audio('src/assets/audio/sounds/lobby/Clock-loading.mp3');

      setTimeout(() => playSound(clock), 500);

      Countdown();

      Inventory('active', room);
      Inventory('passive', room);

      setTimeout(() => {
        const audio = document.querySelector('audio');
        audio.src = 'src/assets/audio/music/The-Prospector.mp3';
        audio.volume = 0.3;
        audio.loop = true;
        audio.play();
        // ! TEST NO INTRO
        // const soundtrack = new Audio('src/assets/audio/music/The-Prospector.mp3');
        // audioConfig(soundtrack, true, true, 0.3);
        // ! TEST NO INTRO
      }, 4800);
    },
    { once: true }
  );

  // NB : Object/Collider Test
  // const object = document.createElement('img');
  // object.className = 'object';
  // object.src = 'src/assets/images/pictures/1F/pointers/console.gif';

  // const collider = document.createElement('div');
  // collider.className = 'collider';

  // app.append(object, collider);
  // NB : Object/Collider Test

  // NB : Hands Test
  // const gif = document.createElement('img');
  // gif.src = 'src/assets/images/pictures/lobby/Hands-1-2.gif';
  // gif.className = 'gif';
  // app.appendChild(gif);
  // NB : Hands Test

  // NB : Stages Test
  Progression();
  // NB : Stages Test

  // Click Counter Stats
  clicksStats();
};

const clicksStats = () => document.addEventListener('click', () => statsCollector('clickCount', 'clicks'));

export function timer(stamp) {
  let now = new Date().getTime();
  let time = Math.floor((now - stamp) / 1000);
  return time;
}

export default Room;
