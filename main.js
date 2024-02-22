import Audio from './src/components/atoms/audio/Audio.js';
import { audioConfig } from './src/components/atoms/audio/Audio.js';
// import Room from './ROOMTEST/Room.js';
// import { Lobby } from './src/pages/Lobby/Lobby';
import { Intro } from './src/pages/intro/Intro.js';
import './style.css';

// Main Menu Soundtrack
const soundtrackMenu = new Audio('/src/assets/audio/music/Main-soundtrack.mp3');
audioConfig(soundtrackMenu, false, true, 0.7);

// Lobby();
// Room();
Intro();
