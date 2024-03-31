import Launch from './src/pages/Main/Opening';
import Main from './src/pages/Main/utils/Main/Main';
import { Lobby } from './src/pages/Lobby/Lobby';
import Room from './src/pages/Room/Room.js';
import { audioConfig } from './src/components/audio/Audio.js';
import { createPasswordModal } from './src/pages/Room/Console/Console.js';
import { preloadAllAssets } from './src/data/preload.js';
import './style.css';
import Loader from './src/components/loader/Loader.js';

//>  Audio src's
// audio.src = '/assets/audio/sounds/lobby/Clock-loading.mp3';
// audio.src = '/assets/audio/music/The-Trapper.mp3';
// audio.src = '/assets/audio/music/The-Prospector.mp3';

// NB : Audio for Intro test
// const audio = document.createElement('audio');
// audio.src = '/assets/audio/music/Main-soundtrack.mp3';
// audioConfig(audio, true, true, 0.5);
// app.appendChild(audio);

// > Menus
// Main();
// Launch();
Lobby();

// > Game
// Room();

// ! BETA TEST
// // > Preload Assets
// preloadAllAssets();

// // > Loader Test
// Loader(document.querySelector('#app'));

// window.addEventListener('load', () => {
//   document.querySelector('.loader').remove();
//   createPasswordModal('beta-access', document.querySelector('#app'), Launch);
// });
// ! BETA TEST
