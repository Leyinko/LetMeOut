import KITCHEN from './Levels/1F/Kitchen/Kitchen';
import BATHROOM from './Levels/1F/Bathroom/Bathroom';
import LIVING from './Levels/1F/Livingroom/Livingroom';
import Stage from './Class/Class';
import Terminal from './Console/Console';
import { firstClickStart, lockPath } from './Progression/Progression';
import { statsCollector } from '../../data/localStorage/LS';
import { randomSounds } from '../../components/audio/Audio';
import { inGameWebSocket } from '../../data/webSocket/webSocket';
import cheatDetect from '../../components/anticheat/cheatsDetect';
import './Room.css';

export const Room = () => {
  // App
  const app = document.querySelector('#app');

  // Room
  const room = document.createElement('section');
  room.id = 'room';

  // Time Stamp
  room.setAttribute('stamp', new Date().getTime());

  app.append(room);

  // Print Room
  // let level = new Stage(BATHROOM);
  // let level = new Stage(KITCHEN);
  let level = new Stage(LIVING);

  level.printRoom();
  Terminal(app);

  // Lock Path
  lockPath();

  // Game Controllers
  gameStartControllers();

  // Start First Click
  room.addEventListener('animationend', () => firstClickStart(), { once: true });
};

function gameStartControllers() {
  // Cheat Control
  // cheatDetect();
  // Random Sounds
  randomSounds();
  // WS Listener
  inGameWebSocket();
  // Stats
  clicksStats();
}

const clicksStats = () => document.addEventListener('click', () => statsCollector('clickCount', 'clicks'));

export default Room;

// // NB : Object/Collider Test
// const object = document.createElement('img');
// object.className = 'object';
// object.src = 'src/assets/images/pictures/1F/pointers-livingroom/picture-wall.png';

// const collider = document.createElement('div');
// collider.className = 'collider';

// app.append(object, collider);
// // NB : Object/Collider Test
