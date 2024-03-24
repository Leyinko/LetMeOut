import KITCHEN from './Levels/1F/Kitchen/Kitchen';
import BATHROOM from './Levels/1F/Bathroom/Bathroom';
import LIVING from './Levels/1F/Livingroom/Livingroom';
import Stage from './Class/Class';
import Terminal from './Console/Console';
import { firstClickStart, lockPaths } from './Progression/Progression';
import { getUserData, statsCollector } from '../../data/localStorage/LS';
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
  app.append(room);

  // Initial Time Stamp
  room.setAttribute('stamp', new Date().getTime());

  // Rooms Assign
  let rooms = [BATHROOM, KITCHEN, LIVING];
  rooms.forEach((level) => {
    let localRoom = getUserData('room');
    level.room == localRoom && new Stage(level).printRoom();
  });

  // Terminal
  Terminal(app);

  // General Settings
  gameControllers(room);
};

function gameControllers(room) {
  // Progression Control
  room.addEventListener('animationend', () => firstClickStart(), { once: true });
  inGameWebSocket();
  lockPaths();
  // cheatDetect();
  // Random Sounds
  randomSounds();
  // Stats
  clicksStats();
}

const clicksStats = () => document.addEventListener('click', () => statsCollector('clickCount', 'clicks'));

export default Room;
