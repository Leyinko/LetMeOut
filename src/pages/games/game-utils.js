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
  "Keep trying, it's getting closer.",
  "Try again, there's no time.",
  '...',
  "It's almost there.",
  'Take it seriously...',
  "Don't be nervous, you're almost there.",
];
