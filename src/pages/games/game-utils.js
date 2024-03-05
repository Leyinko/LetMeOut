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
  'Update failure',
  'Operation aborted.',
  'Error, please report.',
  'Critical error - program terminated.',
  'Bug detected, please contact support.',
  'Program execution halted',
  'Data integrity compromised.',
  'Operation aborted.',
  'Anomaly detected',
];
