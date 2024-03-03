import { audioConfig } from '../src/components/atoms/audio/Audio';
import BATHROOM from './Levels/1F/Bathroom/Bathroom';
import Stage from './Class/Class';
import Progression from './Progression/Progression';
import { Inventory } from '../src/components/molecules/inventory/inventory';
import Terminal from './Console/Console';
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

  // Object/Collider Test
  // const object = document.createElement('img');
  // object.className = 'object';
  // object.src = 'src/assets/images/pictures/1F/pointers/console.gif';

  // const collider = document.createElement('div');
  // collider.className = 'collider';

  // app.append(object, collider);

  // Stages Test
  Progression();

  // Console Test
  Terminal(app);

  // Inventory Test
  Inventory('active');
  Inventory('passive');
};

export default Room;
