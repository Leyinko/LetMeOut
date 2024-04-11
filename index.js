import Launch from './src/pages/Main/Opening';
import Main from './src/pages/Main/utils/Main/Main';
import { Lobby } from './src/pages/Lobby/Lobby';
import Room from './src/pages/Room/Room.js';
import { audioConfig } from './src/components/audio/Audio.js';
import { createPasswordModal } from './src/pages/Room/Console/Console.js';
import { preloadAndLaunch } from './src/data/preload.js';
import Loader from './src/components/loader/Loader.js';
import './style.css';

// NB : Audio for Test
// const audio = document.createElement('audio');
// app.appendChild(audio);

// > Menus
// Main();
// Lobby();
// Room();
// Launch();

// NB : Launch
preloadAndLaunch();
