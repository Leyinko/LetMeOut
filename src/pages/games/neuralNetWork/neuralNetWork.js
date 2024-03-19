import { fisherYatesShuffle, timer } from '../../../utils';
import { statsCollector } from '../../../data/localStorage/LS';
// import { failsOnMinigames } from '../../../localStorage/LS';
import { start } from '../game-utils';
import { showFinalNumber } from '../games';
import Smash from '../smashThatTrash/Smash';
import './neuralNetWork.css';
import { handleTime } from '../../../components/countdown/Countdown';

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

let stamp = 0;

const generateNewPatterns = () => {
  resultPattern = patternGenerator(playerPattern);
  for (var i = 0; i <= 5; i++) {
    animationPattern[i] = patternGenerator(playerPattern);
  }
};

export default function neuralNetWork() {
  // Stamp
  stamp = new Date().getTime();

  const parent = document.querySelector('#repair');
  generateNewPatterns();
  printPattern(playerPattern);
  start('default', animatePattern);
  parent.append(neuralNetWorkContainer);
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
        stage != 4 && start('win', animatePattern);
      } else {
        handleTime(25, false);
        generateNewPatterns();
        playerPattern = playerPattern.map((row) => row.map((element) => 0));
        touchOn = false;
        start('lose', animatePattern);
        // Error
        statsCollector('clickCount', 'games', null, '1');
      }
    }
  } else {
    // Save Stamp
    statsCollector('timestamps', 'minigames', timer(stamp), '1');
    //
    neuralNetWorkContainer.remove();
    Smash();
  }
}
