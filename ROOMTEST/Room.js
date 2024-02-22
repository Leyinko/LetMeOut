import { audioConfig } from '../src/components/atoms/audio/Audio';
import BATHROOM from './Levels/1F/Bathroom/Bathroom';
import Stage from './Class/Class';
import Progression from './Progression/Progression';
import './Room.css';

export const Room = () => {
  // App
  const app = document.querySelector('#app');

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

  // TESTING ZONE ------> HUD for Progression test
  Progression();
};

export default Room;
