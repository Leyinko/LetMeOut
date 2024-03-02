import { mistakePhrases, start } from '../game-utils';
import { showFinalNumber } from '../games';
import './Smash.css';

let stage = 1;
let speed = 1000;
let clicks = 10;

const smashContainer = document.createElement('section');

function Smash() {
  // App
  const gamesModal = document.querySelector('.games-modal');

  smashContainer.id = 'smash-container';

  gamesModal.appendChild(smashContainer);

  // Buttons
  let buttons = 0;
  let rotation = 22.5;
  const radius = 200;
  const totalButtons = 8;

  while (buttons < totalButtons) {
    const angle = (buttons / totalButtons) * 2 * Math.PI;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    let button = document.createElement('div');
    button.className = 'button';
    button.style.position = 'absolute';
    button.style.left = `calc(38% + ${x}px)`;
    button.style.top = `calc(30% + ${y}px)`;
    button.id = `B${buttons + 1}`;
    button.style.transform = `rotate(${rotation}deg)`;

    smashContainer.appendChild(button);

    button.addEventListener('click', (e) => {
      !e.target.classList.contains('active') && console.log('Bitch you failed');
    });

    buttons++;
    rotation += 45;
  }
  start('Act quickly', smashContainer, startGame);
}

function startGame() {
  // Difficulty
  let index = 0;
  let mistakes = 0;

  // Random Sequence
  // let array = [];

  // for (let i = 0; i < 10; i++) {
  //   let randomIndex = Math.floor(Math.random() * 8) + 1;
  //   let query = `#B${randomIndex}`;
  //   array.push(query);
  // }

  const stageStart = setInterval(() => {
    let randomButton = Math.floor(Math.random() * 8) + 1; //array.at(-1);
    let element = document.querySelector(`#B${randomButton}`);
    element.style.animationDuration = `${speed}ms`;

    let click = false;

    if (index < clicks) {
      element.classList.add('active');

      element.addEventListener(
        'animationend',
        () => {
          element.classList.remove('active');
          void element.offsetWidth;
          !click && mistakes++;
        },
        { once: true }
      );
      element.addEventListener('click', (e) => (click = true));
      index++;
    } else {
      clearInterval(stageStart);
      checkResult(mistakes, parent);
    }
  }, speed);
}

function checkResult(mistakes) {
  if (stage < 3) {
    if (mistakes >= 5) {
      start(mistakePhrases[Math.floor(Math.random() * mistakePhrases.length)], smashContainer, startGame);
    } else {
      stage++;
      clicks += 3;
      speed *= 0.8;
      start(`Stage: ${stage}`, smashContainer, startGame);
    }
  } else {
    showFinalNumber();
  }
}

export default Smash;
