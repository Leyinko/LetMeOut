import { Lose } from '../../pages/Result/Result';
import { accessSound, audioConfig, playSound } from '../audio/Audio';
import './release.css';

const errorAudio = new Audio('src/assets/audio/sounds/console/error.mp3');
const clock = new Audio('src/assets/audio/sounds/lobby/Clock-loading.mp3');
const errorWindows = [
  'src/assets/images/pictures/console/Errors-windows-release/Error1.png',
  'src/assets/images/pictures/console/Errors-windows-release/Error2.png',
  'src/assets/images/pictures/console/Errors-windows-release/Error3.png',
  'src/assets/images/pictures/console/Errors-windows-release/Error4.png',
];
const errors = 20;
let counterBugs = 0;
let intervalTime = 700;

// Create bugs
const createBug = (bugsArea) => {
  const randomError = Math.floor(Math.random() * errorWindows.length);
  const bug = document.createElement('img');
  bug.className = 'bug';
  bug.src = errorWindows[randomError];
  bug.alt = 'console_bug';

  bug.style.top = `${Math.floor(Math.random() * 80)}%`;
  bug.style.bottom = `${Math.floor(Math.random() * 80)}%`;
  bug.style.left = `${Math.floor(Math.random() * 80)}%`;
  bug.style.right = `${Math.floor(Math.random() * 80)}%`;

  playSound(errorAudio);

  bugsArea.append(bug);
};

// Function Release IANA
const Release = () => {
  const screen = document.getElementById('screen');
  let audio = document.querySelector('audio');

  //Bugs creation
  const bugsArea = document.createElement('div');
  bugsArea.className = 'bugs-area';
  screen.appendChild(bugsArea);
  //
  audio.pause();
  accessSound('access-granted');
  document.querySelector('#countdown-timer').remove();

  setTimeout(() => createErrorWindow(bugsArea), 1000);
};

function createErrorWindow(bugsArea) {
  const app = document.querySelector('#app');

  if (counterBugs < errors) {
    setTimeout(() => {
      counterBugs++;
      createBug(bugsArea);
      intervalTime = Math.floor((intervalTime /= 1.1));
      createErrorWindow(bugsArea);
    }, intervalTime);
  } else if (counterBugs == errors) {
    setTimeout(() => {
      let deploying = document.createElement('img');
      deploying.src = 'src/assets/images/pictures/console/Errors-windows-release/deploying.gif';
      deploying.className = 'deploying';

      document.querySelector('.bugs-area').appendChild(deploying);

      playSound(clock);
    }, 100);

    setTimeout(() => {
      app.innerHTML = '';
    }, 3500);

    setTimeout(() => {
      let audio = document.createElement('audio');
      audio.src = 'src/assets/audio/sounds/console/audio911.mp3';
      app.appendChild(audio);

      audioConfig(audio, true, false, 0.7);

      audio.addEventListener('ended', () => Lose());
    }, 5000);
  }
}

export default Release;
