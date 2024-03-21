import Launch from './src/pages/Main/Opening';
import Main from './src/pages/Main/utils/Main/Main';
import { Lobby } from './src/pages/Lobby/Lobby';
import Room from './src/pages/Room/Room.js';
import { audioConfig } from './src/components/audio/Audio.js';
import './style.css';

//>  Audio src's
// audio.src = './src/assets/audio/sounds/lobby/Clock-loading.mp3';
// audio.src = 'src/assets/audio/music/The-Trapper.mp3';
// audio.src = 'src/assets/audio/music/The-Prospector.mp3';

// NB : Audio for Intro test
const audio = document.createElement('audio');
// audio.src = 'src/assets/audio/music/Main-soundtrack.mp3';
// audioConfig(audio, true, true, 0.5);

app.appendChild(audio);

// > Menus
// Main();
// Launch();
// Lobby();

// > Game
Room();

// Cursor Test
// let cursor = document.createElement('div');
// cursor.id = 'cursor';

// let hand = document.createElement('img');
// hand.src = 'src/assets/images/cursor.png';

// cursor.appendChild(hand);
// document.querySelector('#app').appendChild(cursor);

// document.addEventListener('mousemove', (e) => {
//   cursor.setAttribute('style', 'top: ' + (e.pageY - 30) + 'px; left: ' + (e.pageX - 30) + 'px;');
// });

// document.addEventListener('mousedown', (e) => {
//   hand.src = `src/assets/images/cursor-grab.png`;
// });

// document.addEventListener('mouseup', (e) => {
//   hand.src = `src/assets/images/cursor.png`;
// });
