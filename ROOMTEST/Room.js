import './Room.css';

export const Room = () => {
  // App
  const app = document.querySelector('#app');

  // Room
  const room = document.createElement('section');
  room.id = 'room';
  app.append(room);

  // Background
  let background = document.createElement('img');
  background.src = 'src/assets/images/pictures/1F/BATHROOM-POINTED.png';
  background.className = 'background';

  room.appendChild(background);

  // Object
  let object = document.createElement('img');
  object.src = 'src/assets/images/pictures/1F/pointers/SECRETNOTE _3.png';
  object.className = 'object';

  room.appendChild(object);

  // Collider
  let collider = document.createElement('div');
  collider.className = 'collider';

  room.appendChild(collider);

  // Version
  // version('V1.0', room);
};

export default Room;
