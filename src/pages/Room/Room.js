import KITCHEN from './Levels/1F/Kitchen/Kitchen';
import BATHROOM from './Levels/1F/Bathroom/Bathroom';
import LIVING from './Levels/1F/Livingroom/Livingroom';
import Stage from './Class/Class';
import { firstClickStart, lockPaths } from './Progression/Progression';
import { getDifficulty, getUserData, statsCollector } from '../../data/localStorage/LS';
import { randomSounds } from '../../components/audio/Audio';
import { inGameWebSocket } from '../../data/webSocket/webSocket';
import cheatDetect from '../../components/anticheat/cheatsDetect';
import './Room.css';

export let difficulty;

export const Room = () => {
  // App
  const app = document.querySelector('#app');

  // Room
  const room = document.createElement('section');
  room.id = 'room';
  app.append(room);

  // Set Difficulty
  difficulty = getDifficulty();

  // Start Time Stamp
  room.setAttribute('stamp', new Date().getTime());

  // Room Print
  let rooms = [BATHROOM, KITCHEN, LIVING];
  rooms.forEach((level) => {
    let localRoom = getUserData('room');
    level.room == localRoom && new Stage(level).printRoom();
  });

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
  cheatDetect();
  // Random Sounds
  randomSounds();
  // Click Collector
  room.addEventListener('click', () => statsCollector('clickCount', 'clicks'));
}

export default Room;
