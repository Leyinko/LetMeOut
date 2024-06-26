import { handleTime } from '../../../components/countdown/Countdown';
import { statsCollector } from '../../../data/localStorage/LS';
import { timer } from '../../../utils';
import { showFinalNumber, start } from '../../Games/games';
import { difficulty_settings } from '../../Room/Progression/Difficulty';
import { difficulty } from '../../Room/Room';
import './Smash.css';

let stage = 1;
let speed;
let times = 10;

let stamp = 0;

const smashContainer = document.createElement('section');

function Smash() {
  // Stamp
  stamp = new Date().getTime();

  // Difficulty
  speed = difficulty_settings[difficulty].assistance ? 1250 : 1100;

  // App
  const parent = document.querySelector('#repair');
  smashContainer.id = 'smash-container';

  !parent.contains(smashContainer) && parent.appendChild(smashContainer);

  // Buttons
  let buttons = 0;
  let rotation = 22.5;
  const radius = 100;
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

    buttons++;
    rotation += 45;
  }
  start('default', startGame);
}

function startGame() {
  let index = 0;

  const stageStart = setInterval(() => {
    let randomButton = Math.floor(Math.random() * 8) + 1;
    let element = document.querySelector(`#B${randomButton}`);

    let click = false;

    if (index < times) {
      element.classList.add('active');

      setTimeout(() => {
        if (!click) {
          handleTime(difficulty_settings[difficulty].errors, false);
          start('lose', startGame);
          clearInterval(stageStart);
          // Error
          statsCollector('clickCount', 'games', null, '2');
        }
        element.classList.remove('active');
      }, speed - (stage === 3 ? 50 : 100));

      element.addEventListener('click', (e) => (click = true));
      index++;
    } else {
      clearInterval(stageStart);
      checkResult();
    }
  }, speed);
}

function checkResult() {
  if (stage < 3) {
    stage++;
    times += 3;
    speed *= 0.8;
    start(`win`, startGame);
  } else {
    // Save Stamp
    statsCollector('timestamps', 'minigames', timer(stamp), '2');
    // Final Code
    showFinalNumber();
  }
}

export default Smash;
