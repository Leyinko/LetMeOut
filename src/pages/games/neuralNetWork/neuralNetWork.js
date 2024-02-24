import { fisherYatesShuffle } from '../../../../utils';
import './neuralNetWork.css';

const app = document.getElementById('app');
const neuralNetWorkContainer = document.createElement('section');
neuralNetWorkContainer.className = 'neuralnetwork-container';

let patternTemplate = [
  [0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0],
];

let touchOn = false;
let stage = 1;

const resultPattern = patternGenerator(patternTemplate);

const animationPattern = [];

for (var i = 0; i < 5; i++) {
  animationPattern[i] = patternGenerator(patternTemplate);
}

export default function neuralNetWork() {
  printPattern(patternTemplate);
  start();
  console.log(resultPattern);
  app.append(neuralNetWorkContainer);
}

function patternGenerator(pattern) {
  const probability = 0.4;

  const newPattern = pattern.map((row) => {
    const newRow = row.map((element, index) => {
      if (index < row.length * probability) {
        return 1;
      } else {
        return 0;
      }
    });

    return fisherYatesShuffle(newRow);
  });
  return newPattern;
}

function printPattern(pattern) {
  neuralNetWorkContainer.innerHTML = '';

  pattern.forEach((row, columnIndex) => {
    const rowElement = document.createElement('div');
    rowElement.className = 'pattern-row';

    row.forEach((neuron, neuronIndex) => {
      const neuronElement = document.createElement('div');
      neuronElement.className = neuron == 0 ? 'neuron' : 'neuron-active';

      neuronElement.addEventListener('click', () => {
        if (touchOn) {
          patternTemplate[columnIndex][neuronIndex] = patternTemplate[columnIndex][neuronIndex] == 0 ? 1 : 0;
          printPattern(patternTemplate);
          setTimeout(checkResult, 0);
        }
      });
      rowElement.append(neuronElement);
    });
    neuralNetWorkContainer.append(rowElement);
  });
}

function animatePattern() {
  let index = 1;
  const interval = setInterval(() => {
    if (index % 2 != 0) {
      printPattern(patternTemplate);
    } else {
      if (index / 2 < animationPattern.length) {
        printPattern(animationPattern[index / 2 - 1]);
      } else if (index / 2 > animatePattern.length && index / 2 < animationPattern.length + 3) {
        printPattern(resultPattern);
      } else {
        clearInterval(interval);
        touchOn = true;
      }
    }
    index++;
  }, 500);
}

function checkResult() {
  const resultOne = patternTemplate.flat().toString();
  const resultTwo = resultPattern.flat().toString();

  if (resultOne === resultTwo) {
    alert('Bien');
    stage++;
    start('stage: ' + stage);
  }
}

function start(displayStage) {
  const displayMessage = document.createElement('h2');
  displayMessage.classList.add('display-timer-2');

  if (!displayStage) {
    let timer = 3;
    const starInterval = setInterval(() => {
      if (timer > 0) {
        displayMessage.textContent = timer.toString();
        timer--;
        neuralNetWorkContainer.appendChild(displayMessage);
      } else {
        clearInterval(starInterval);
        neuralNetWorkContainer.removeChild(displayMessage);
        animatePattern();
      }
    }, 1000);
  } else {
    displayMessage.textContent = displayStage;
    neuralNetWorkContainer.appendChild(displayMessage);
    var stageTimeout = setTimeout(() => {
      displayMessage.remove();
      clearTimeout(stageTimeout);
      start();
    }, 1000);
  }
}
