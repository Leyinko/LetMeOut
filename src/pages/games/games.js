import EthernetConnection from './ethernetConection/ethernetConnection';
import MemoryPath from './memoryPath/memoryPath';
import neuralNetWork from './neuralNetWork/neuralNetWork';
import Smash from './smashThatTrash/Smash';

export default function Games(parent) {
  const gamesModal = document.createElement('article');
  gamesModal.className = 'games-modal';

  parent.appendChild(gamesModal);
  // Smash();
  MemoryPath();
  // neuralNetWork();
  //EthernetConnection();
}

export function showFinalNumber() {
  const gamesModal = document.querySelector('.games-modal');
  const finalNumberModal = document.createElement('h2');
  finalNumberModal.className = 'final-number';
  finalNumberModal.textContent = '3';

  gamesModal.innerHTML = '';

  gamesModal.appendChild(finalNumberModal);
}
