import MemoryPath from './memoryPath/memoryPath';
import neuralNetWork from './neuralNetWork/neuralNetWork';
import Smash from './smashThatTrash/Smash';

const app = document.getElementById('app');

export default function Games() {
  const gamesModal = document.createElement('article');
  gamesModal.className = 'games-modal';

  app.appendChild(gamesModal);
  neuralNetWork();
}

export function showFinalNumber() {
  const gamesModal = document.querySelector('.games-modal');
  const finalNumberModal = document.createElement('h2');
  finalNumberModal.className = 'final-number';
  finalNumberModal.textContent = '3';

  gamesModal.appendChild(finalNumberModal);
}
