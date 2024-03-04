import './memoryPath.css';
import { start, mistakePhrases } from '../game-utils';
import { handleTime } from '../../../components/atoms/countdownTimer/Timer';
import neuralNetWork from '../neuralNetWork/neuralNetWork';

const memoryPathContainer = document.createElement('section');
memoryPathContainer.className = 'memorypath-container';

let map = Array.from(Array(5), () => new Array(5).fill(0));
let resultPath = [];
let playerPath = [];
let firstMove = [];
let moves = -1;
const directions = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];
let stage = 1;
let steps = 5;
let moveSpeed = 1000;
let buttonOn = false;

export default function MemoryPath() {
  //dispaly cells
  const gamesModal = document.querySelector('.games-modal');
  map.forEach((row, columnIndex) => {
    const rowElement = document.createElement('div');
    rowElement.className = 'map-row';

    row.forEach((cell, rowIndex) => {
      const cellElement = document.createElement('div');
      cellElement.className = cell ? 'cell' : 'void-cell';
      cellElement.id = `cell${columnIndex}${rowIndex}`;

      rowElement.appendChild(cellElement);
    });
    memoryPathContainer.appendChild(rowElement);
  });

  //display controll buttons
  const keyboard = document.createElement('div');
  keyboard.className = 'keyboard-memorypath';

  for (let i = 0; i < 4; i++) {
    const button = document.createElement('img');
    button.className = 'button-memorypath';
    button.src = 'src/assets/images/icons/console/games/arrow.png';
    button.id = `b${i}`;
    button.textContent = '⬆️';

    button.addEventListener('click', () => {
      if (buttonOn) {
        const dir = parseInt(button.id.substring(1));
        if (isValidMove(dir, firstMove[0], firstMove[1])) {
          cleanCell();
          playerPath.push(dir);
          let newX = (firstMove[0] += directions[dir][0]);
          let newY = (firstMove[1] += directions[dir][1]);
          map[newX][newY] = 1;
          const cell = document.querySelector(`#cell${newY}${newX}`);
          cell.classList.add('active-selected');
          moves++;
          checkResult();
        } else {
          cleanCell();
          playerPath.push(dir);
          moves++;
          checkResult();
        }
      }
    });

    keyboard.appendChild(button);
  }

  memoryPathContainer.appendChild(keyboard);

  gamesModal.appendChild(memoryPathContainer);
  start(`Pathfinder v1.3 - Analyzing...`, memoryPathContainer, createPath);
}

function createPath() {
  let index = 0;
  let x = Math.floor(Math.random() * 5);
  let y = Math.floor(Math.random() * 5);
  firstMove = [x, y];

  const interval = setInterval(() => {
    cleanCell();

    if (index < steps) {
      const cell = document.querySelector(`#cell${y}${x}`);
      cell.classList.add('pop');

      let dir = Math.floor(Math.random() * 4);
      let dirIndex = 0;
      while (dirIndex < 4 && !isValidMove(dir, x, y)) {
        dir = (dir + 1) % 4;
        dirIndex++;
      }

      if (dirIndex < 4) {
        x += directions[dir][0];
        y += directions[dir][1];
        resultPath.push(dir);
      }
      index++;
    } else {
      const firstCell = document.querySelector(`#cell${firstMove[1]}${firstMove[0]}`);
      firstCell.classList.add('active-selected');
      buttonOn = true;
      clearInterval(interval);
    }
  }, moveSpeed);
}

function isValidMove(dir, x, y) {
  const newX = x + directions[dir][0];
  const newY = y + directions[dir][1];
  return newX >= 0 && newX < 5 && newY >= 0 && newY < 5;
}

function checkResult() {
  console.log(playerPath, resultPath);
  if (stage <= 3) {
    if (resultPath[moves] != playerPath[moves]) {
      cleanCell();
      resetGame();
      handleTime(20, false);
      start(mistakePhrases[Math.floor(Math.random() * mistakePhrases.length)], memoryPathContainer, createPath);
    } else {
      if (playerPath.join('').length == resultPath.join('').replace(/\d$/, '').length) {
        if (playerPath.join('') == resultPath.join('').replace(/\d$/, '')) {
          stage++;
          steps += 2;
          moveSpeed * 0.75;
          resetGame();
          stage == 4 && checkResult();
          stage != 4 && start(`stage: ${stage}`, memoryPathContainer, createPath);
        } else {
          resetGame();
          handleTime(20, false);
          start(`Stage: ${stage}`, memoryPathContainer, createPath);
        }
      }
    }
  } else {
    memoryPathContainer.remove();
    neuralNetWork();
  }
}

function resetGame() {
  playerPath = [];
  resultPath = [];
  moves = -1;
}

function cleanCell() {
  const cells = document.querySelectorAll('.void-cell');
  cells.forEach((element) => {
    element.classList.remove('pop');
    element.classList.remove('active-selected');
    element.classList.remove('cell');
  });
}
