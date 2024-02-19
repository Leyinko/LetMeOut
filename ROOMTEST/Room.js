import Stage, { R1 } from './RoomClass';
import './Room.css';

export const Room = () => {
  // App
  const app = document.querySelector('#app');

  // Room
  const room = document.createElement('section');
  room.id = 'room';
  app.append(room);

  // Print Room
  let bathroom = new Stage(R1);
  bathroom.printRoom();

  // Stages
  randomStages();
};

export default Room;

function randomStages() {
  let pointers = document.querySelectorAll('div:not(#app)');
  let shuffled = fisherYatesShuffle(Array.from(pointers));
  console.log(shuffled);
}

function fisherYatesShuffle(arr) {
  var n = arr.length;
  for (var i = n - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}
