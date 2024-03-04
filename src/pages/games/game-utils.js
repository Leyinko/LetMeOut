import './games.css';

export function start(displayStage, node, callback) {
  const displayMessage = document.createElement('h2');
  displayMessage.classList.add('display-timer');

  if (!displayStage) {
    let timer = 3;
    const starInterval = setInterval(() => {
      if (timer > 0) {
        displayMessage.textContent = timer.toString();
        timer--;
        node.appendChild(displayMessage);
      } else {
        clearInterval(starInterval);
        node.removeChild(displayMessage);
        callback();
      }
    }, 1000);
  } else {
    displayMessage.textContent = displayStage;
    node.appendChild(displayMessage);
    var stageTimeout = setTimeout(() => {
      displayMessage.remove();
      clearTimeout(stageTimeout);
      start(false, node, callback);
    }, 2000);
  }
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
