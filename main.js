<<<<<<< HEAD
import { audioConfig } from './src/components/atoms/audio/Audio.js';
// import { Intro } from './src/pages/intro/Intro.js';
=======
import Audio from './src/components/atoms/audio/Audio.js';
// import Room from './ROOMTEST/Room.js';
import { Intro } from './src/pages/intro/Intro.js';
>>>>>>> 53ed6e87e2554f026d2a028a779c82ce73aba46e
// import { Lobby } from './src/pages/Lobby/Lobby';
import Room from './ROOMTEST/Room.js';
import './style.css';

// Main Menu Soundtrack
const soundtrackMenu = new Audio('/src/assets/audio/music/Main-soundtrack.mp3');
audioConfig(soundtrackMenu, false, true, 0.7);

// Lobby();
// Room();
Intro();
