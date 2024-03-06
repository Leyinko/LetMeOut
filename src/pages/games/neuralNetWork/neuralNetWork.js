import { fisherYatesShuffle } from '../../../../utils';
import { handleTime } from '../../../components/atoms/countdownTimer/Timer';
import { failsOnMinigames } from '../../../localStorage/LS';
import { mistakePhrases, start } from '../game-utils';
import { showFinalNumber } from '../games';
import Smash from '../smashThatTrash/Smash';
import './neuralNetWork.css';

const neuralNetWorkContainer = document.createElement('section');
neuralNetWorkContainer.className = 'neuralnetwork-container';

let playerPattern = [
  [0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0],
];

let touchOn = false;
let stage = 1;

let resultPattern = [];

const animationPattern = [];

const generateNewPatterns = () => {
  resultPattern = patternGenerator(playerPattern);
  for (var i = 0; i <= 5; i++) {
    animationPattern[i] = patternGenerator(playerPattern);
  }
};

export default function neuralNetWork() {
  const gamesModal = document.querySelector('.games-modal');
  generateNewPatterns();
  printPattern(playerPattern);
  start('Glitch Memory v3.4 - Reboot issue found...', animatePattern);
  console.log(resultPattern);
  gamesModal.append(neuralNetWorkContainer);
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
          playerPattern[columnIndex][neuronIndex] = playerPattern[columnIndex][neuronIndex] == 0 ? 1 : 0;
          printPattern(playerPattern);
          setTimeout(checkResult(playerPattern, resultPattern), 0);
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
      printPattern(playerPattern);
    } else {
      if (index / 2 < animationPattern.length) {
        printPattern(animationPattern[index / 2 - 1]);
      } else if (index / 2 > animationPattern.length - 1 && index / 2 < animationPattern.length + (4 - stage)) {
        printPattern(resultPattern);
      } else {
        clearInterval(interval);
        touchOn = true;
      }
    }
    index++;
  }, 500);
}

function checkResult(resultOne, resultTwo) {
  if (stage <= 3) {
    const neuronPressed = resultOne.map((row) => row.filter((neuron) => neuron == 1));

    if (neuronPressed.flat().length == 10) {
      if (resultOne.flat().toString() === resultTwo.flat().toString()) {
        touchOn = false;
        stage++;
        playerPattern = playerPattern.map((row) => row.map((element) => 0));
        generateNewPatterns();
        stage == 4 && checkResult();
        stage != 4 && start('stage: ' + stage, neuralNetWorkContainer, animatePattern);
      } else {
        handleTime(20, false);
        generateNewPatterns();
        playerPattern = playerPattern.map((row) => row.map((element) => 0));
        touchOn = false;
        start(mistakePhrases[Math.floor(Math.random() * mistakePhrases.length)], animatePattern);
        failsOnMinigames('neuralNetWork');
      }
    }
  } else {
    neuralNetWorkContainer.remove();
    Smash();
  }
}
