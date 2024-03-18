import Launch from './src/pages/Main/Opening';
import Main from './src/pages/Main/utils/Main/Main';
import { Lobby } from './src/pages/Lobby/Lobby';
import Room from './src/pages/Room/Room.js';
import { audioConfig } from './src/components/audio/Audio.js';
import './style.css';
import cheatDetect from './src/components/cheatsDetect/cheatsDetect.js';

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
//Lobby();

// > Game
Room();

//Puedes ponerlo donde te salga de la pinga. Comentalo si no quieres que te quite tiempo mientras haces cosas jeje
// cheatDetect();
