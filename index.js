import { Lobby } from './src/pages/Lobby/Lobby';
// import ianasays from './src/pages/games/ianasays/ianasays.js';
// import { playSound } from './src/components/atoms/audio/Audio';
// import Main from './src/pages/Main/utils/Main/Main';
import Launch from './src/pages/Main/Opening';
// import Smash from './src/pages/games/smashThatTrash/Smash';
// import { Intro } from './src/pages/Intro/Intro';
//import neuralNetWork from './src/pages/games/neuralNetWork/neuralNetWork.js';
import Main from './src/pages/Main/utils/Main/Main';
// import Launch from './src/pages/Main/Opening';
import MemoryPath from './src/pages/games/memoryPath/memoryPath';
import Smash from './src/pages/games/smashThatTrash/Smash';
import countdown from './src/components/atoms/countdownTimer/Timer';
import './style.css';
// import Inventory from './src/components/molecules/inventory/inventory';
import Games from './src/pages/games/games.js';
import Room from './src/pages/Room/Room.js';

// const audio = new Audio('src/assets/audio/music/Main-soundtrack.mp3');
// const audio = new Audio('src/assets/audio/music/The-Prospector.mp3');
// setTimeout(() => {
//   playSound(audio);
// }, 600);

// Audio
// audio.src = './src/assets/audio/sounds/lobby/Clock-loading.mp3';

// const audio = document.createElement('audio');
// audio.src = 'src/assets/audio/music/The-Trapper.mp3';
// audio.src = 'src/assets/audio/music/The-Prospector.mp3';
// audio.loop = true;
// audio.volume = 0.5;
// audio.play();

// app.appendChild(audio);

// ! Reload

// > Menus
// Main();
// Launch();
// Lobby();

// > Game
// Intro();
Room();

// > Mini-Games
// Games();
//ianasays();
// neuralNetWork();
//MemoryPath();
// Smash();

// > HUD
//countdown();
