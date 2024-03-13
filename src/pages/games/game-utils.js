import './games.css';

export function start(displayStage, callback) {
  const displayMessage = document.createElement('h2');
  displayMessage.classList.add('display-timer');

  const gamesModal = document.querySelector('.games-modal');

  displayMessage.textContent = displayStage;
  gamesModal.appendChild(displayMessage);
  var stageTimeout = setTimeout(() => {
    displayMessage.remove();
    clearTimeout(stageTimeout);
    callback();
  }, 2000);
}

export const mistakePhrases = [
  'UPDATE FAILURE',
  'OPERATION ABORTED.',
  'ERROR, PLEASE REPORT.',
  'CRITICAL ERROR.',
  'BUG DETECTED, PLEASE CONTACT SUPPORT.',
  'PROGRAM EXECUTION HALTED',
  'DATA INTEGRITY COMPROMISED.',
  'OPERATION ABORTED.',
  'ANOMALY DETECTED',
];
