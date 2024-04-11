import { accessSound } from '../../components/audio/Audio';
import { fetchFinalCode } from '../../data/fetch';
import { unlockHiddenEnding } from '../Room/Progression/Progression';
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

  // Hidden Access Condition
  !!document.querySelector('.green') ? unlockHiddenEnding() : accessSound('success');

  document.querySelector('#smash-container').remove();

  container.style.background = `url('/assets/images/pictures/console/Windows/fixed.png') center/contain no-repeat`;

  const finalNumberModal = document.createElement('h3');
  finalNumberModal.className = 'final-number';
  finalNumberModal.textContent = String(await fetchFinalCode());

  container.appendChild(finalNumberModal);
}
