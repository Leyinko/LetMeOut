import KITCHEN from './Levels/1F/Kitchen/Kitchen';
import BATHROOM from './Levels/1F/Bathroom/Bathroom';
import LIVING from './Levels/1F/Livingroom/Livingroom';
import Stage from './Class/Class';
import Terminal from './Console/Console';
import { firstClickStart, lockPaths } from './Progression/Progression';
import { getUserData, statsCollector } from '../../data/localStorage/LS';
import { randomSounds } from '../../components/audio/Audio';
import { inGameWebSocket } from '../../data/webSocket/webSocket';
import cheatDetect, { stopSpeedUp, interval } from '../../components/anticheat/cheatsDetect';
import './Room.css';

export const Room = () => {
  // App
  const app = document.querySelector('#app');

  // Room
  const room = document.createElement('section');
  room.id = 'room';
  app.append(room);

  // Start Time Stamp
  room.setAttribute('stamp', new Date().getTime());

  // Room Print
  let rooms = [BATHROOM, KITCHEN, LIVING];
  rooms.forEach((level) => {
    let localRoom = getUserData('room');
    level.room == localRoom && new Stage(level).printRoom();
  });

  // Console On
  Terminal(app);

  // Game Settings
  gameControllers(room);
};

function gameControllers(room) {
  // First Click
  room.addEventListener('animationend', () => firstClickStart(), { once: true });
  // Active WS
  inGameWebSocket();
  // Lock Progression Paths
  lockPaths();
  // ANTI-CHEAT
  interval && stopSpeedUp();
  cheatDetect();
  // Random Sounds
  randomSounds();
  // Clicks
  document.addEventListener('click', () => statsCollector('clickCount', 'clicks'));
}

export default Room;
