import Room from './ROOMTEST/Room.js';
// import { Lobby } from './src/pages/Lobby/Lobby';
// import ianasays from './src/pages/games/ianasays/ianasays.js';
// import neuralNetWork from './src/pages/games/neuralNetWork/neuralNetWork.js';
// import Main from './src/pages/Main/utils/Main/Main';
// import Launch from './src/pages/Main/Opening';
import MemoryPath from './src/pages/games/memoryPath/memoryPath';
import Smash from './src/pages/games/smashThatTrash/Smash';
import countdown from './src/components/atoms/countdownTimer/Timer';

import './style.css';
import Inventory from './src/components/molecules/inventory/inventory';

// > Menus
// Main();
// Launch();
// Lobby();

// > Game
Room();

// > Mini-Games
//Smash();
//ianasays();
// neuralNetWork();
//MemoryPath();

// Smash();
//ianasays();
// neuralNetWork();
//countdown();

const iconsArray = [
  './src/assets/images/icons/active/Clock.png',
  './src/assets/images/icons/active/Diskette.png',
  './src/assets/images/icons/active/Ethernet.png',
  './src/assets/images/icons/active/Fusible.png',
];
const clickableIconsArray = [
  './src/assets/images/icons/active/Clock.png',
  './src/assets/images/icons/active/Diskette.png',
];

Inventory(iconsArray, 'main-inventory');
Inventory(clickableIconsArray, 'clickable-inventory');
