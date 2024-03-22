import { fetchFinalCode } from '../../data/fetch';
import { accessSound } from '../Room/Progression/Progression';
import './games.css';

export function start(win, callback) {
  if (win == 'win') {
    accessSound('success');
  } else if (win == 'lose') {
    accessSound('error');
  }

  var stageTimeout = setTimeout(() => {
    clearTimeout(stageTimeout);
    callback();
  }, 1000);
}

export async function showFinalNumber() {
  const container = document.querySelector('#repair');
  const finalNumberModal = document.createElement('h3');
  finalNumberModal.className = 'final-number';

  // Print
  finalNumberModal.textContent = String(await fetchFinalCode());

  document.querySelector('#smash-container').remove();

  container.appendChild(finalNumberModal);
}
