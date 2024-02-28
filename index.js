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
  { src: './src/assets/images/icons/active/Clock.png', click: true },
  { src: './src/assets/images/icons/active/Diskette.png', click: true },
  { src: './src/assets/images/icons/active/Ethernet.png', click: true },
  { src: './src/assets/images/icons/active/Fusible.png', click: true },
];
const clickableIconsArray = [
  { src: './src/assets/images/pictures/enigmas/tickets/Ticket1.png', click: true },
  { src: './src/assets/images/pictures/enigmas/polaroids/Polaroid-kitchen.png', click: true },
];

const notesArray = [
  { src: './src/assets/images/pictures/story-notes/1.png', click: true },
  { src: './src/assets/images/pictures/story-notes/2.png', click: true },
  { src: './src/assets/images/pictures/story-notes/3.png', click: true },
  { src: './src/assets/images/pictures/story-notes/4.png', click: true },
  { src: './src/assets/images/pictures/story-notes/5.png', click: true },
  { src: './src/assets/images/pictures/story-notes/6.png', click: true },
  { src: './src/assets/images/pictures/story-notes/7.png', click: true },
  { src: './src/assets/images/pictures/story-notes/8.png', click: true },
  { src: './src/assets/images/pictures/story-notes/9.png', click: true },
];

const dropdownArray = [
  {
    src: './src/assets/images/icons/passive/Notebook.png',
    click: true,
  },
];

Inventory(iconsArray, 'main-inventory');
Inventory(clickableIconsArray, 'clickable-inventory');
Inventory(notesArray, 'note-inventory');
Inventory(dropdownArray, 'dropdown-note');
