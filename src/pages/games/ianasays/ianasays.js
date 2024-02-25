import './ianasays.css';

const keyBoardLayout = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '🔙'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', '✅'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
];

const resultWords = ['UCIEKA', 'WYSIADAC', 'ZNIKNAC', 'IDZSTAD'];

const app = document.getElementById('app');
const ianasaysContainer = document.createElement('section');

let gameStage = 0;
let speedWrite = 1000;
let keyboardOn = false;

export default function ianasays() {
  ianasaysContainer.classList.add('ianasays-container');

  app.appendChild(ianasaysContainer);

  const inputGame = document.createElement('input');
  inputGame.type = 'text';
  inputGame.classList.add('ianasays-input');
  inputGame.readOnly = true;

  const keyboardGame = document.createElement('div');
  keyboardGame.classList.add('keyboard-game');

  ianasaysContainer.append(inputGame, keyboardGame);

  keyBoardLayout.forEach((row) => {
    const rowElement = document.createElement('div');
    rowElement.classList.add('keyboard-row');

    row.forEach((key) => {
      const keyButton = document.createElement('button');
      keyButton.classList.add('keyboard-key');
      keyButton.id = key;
      keyButton.textContent = key;

      keyButton.addEventListener('click', () => {
        if (keyboardOn) {
          keyButton.style.animation = '';
          keyButton.offsetWidth;
          keyButton.style.animation = 'show 0.5s linear';

          if (key == '🔙') {
            const newValue = inputGame.value.substring(0, inputGame.value.length - 1);
            inputGame.value = newValue;
          } else if (key == '✅') {
            const levelComplete = checkGame(inputGame.value);

            if (levelComplete) {
              if (gameStage == resultWords.length - 1) {
                alert('Juego terminado');
              } else {
                gameStage++;
                speedWrite *= 0.75;
                keyboardOn = false;
                start('Stage: ' + (gameStage + 1));
                inputGame.value = '';
              }
            } else {
              alert('fallaste');
            }
          } else {
            inputGame.value += key;
          }
        }
      });

      rowElement.appendChild(keyButton);
    });
    keyboardGame.appendChild(rowElement);
  });

  start();
}

function checkGame(word) {
  if (word == resultWords[gameStage]) {
    return true;
  } else {
    return false;
  }
}

function keyHint() {
  let index = 0;

  const interval = setInterval(() => {
    if (index < resultWords[gameStage].length) {
      const keyShow = document.getElementById(resultWords[gameStage][index]);
      keyShow.style.animation = '';
      keyShow.offsetWidth;
      keyShow.style.animation = 'show 0.5s linear';

      index++;
    } else {
      clearInterval(interval);
      keyboardOn = true;
    }
  }, speedWrite);
}

function start(displayStage) {
  const displayMessage = document.createElement('h2');
  displayMessage.classList.add('display-timer');

  if (!displayStage) {
    let timer = 3;
    const starInterval = setInterval(() => {
      if (timer > 0) {
        displayMessage.textContent = timer.toString();
        timer--;
        ianasaysContainer.appendChild(displayMessage);
      } else {
        clearInterval(starInterval);
        ianasaysContainer.removeChild(displayMessage);
        keyHint();
      }
    }, 1000);
  } else {
    displayMessage.textContent = displayStage;
    ianasaysContainer.appendChild(displayMessage);
    var stageTimeout = setTimeout(() => {
      displayMessage.remove();
      clearTimeout(stageTimeout);
      start();
    }, 1000);
  }
}
