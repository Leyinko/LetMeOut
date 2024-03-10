import Launch from './src/pages/Main/Opening';
import Main from './src/pages/Main/utils/Main/Main';
import { Lobby } from './src/pages/Lobby/Lobby';
import Room from './src/pages/Room/Room.js';
import './style.css';

//>  Audio src's
// audio.src = './src/assets/audio/sounds/lobby/Clock-loading.mp3';
// audio.src = 'src/assets/audio/music/The-Trapper.mp3';
// audio.src = 'src/assets/audio/music/The-Prospector.mp3';

// NB : Audio for Intro test
// const audio = document.createElement('audio');
// audio.src = 'src/assets/audio/music/Main-soundtrack.mp3';
// audio.loop = true;
// audio.volume = 0.5;
// audio.play();
// app.appendChild(audio);

// > Menus
// Main();
// Launch();
// Lobby();

// > Game
Room();
