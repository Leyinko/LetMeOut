import './release.css';
import { Lose } from '../../pages/Result/Result';
import { playSound } from '../audio/Audio';

const errorAudio = new Audio('src/assets/audio/sounds/console/error.mp3');
const audio911 = new Audio('src/assets/audio/sounds/console/audio911.mp3');
const errorWindows = [
  'src/assets/images/pictures/console/Errors-windows-release/Error1.png',
  'src/assets/images/pictures/console/Errors-windows-release/Error2.png',
  'src/assets/images/pictures/console/Errors-windows-release/Error3.png',
  'src/assets/images/pictures/console/Errors-windows-release/Error4.png',
];
const errors = 20;

// Create bugs
const createBug = (bugsArea) => {
  const randomError = Math.floor(Math.random() * errorWindows.length);
  const bug = document.createElement('img');
  bug.className = 'bug';
  bug.src = errorWindows[randomError];
  bug.alt = 'console bug';

  bug.style.top = `${Math.floor(Math.random() * 80)}%`;
  bug.style.bottom = `${Math.floor(Math.random() * 80)}%`;
  bug.style.left = `${Math.floor(Math.random() * 80)}%`;
  bug.style.right = `${Math.floor(Math.random() * 80)}%`;

  playSound(errorAudio);

  bugsArea.append(bug);
};

const nineOneOne = () => {
  playSound(audio911);
  setTimeout(() => {
    Lose();
  }, 16000);
};

// Function Release IANA
const Release = () => {
  const screen = document.getElementById('screen');
  //Bugs creation
  const bugsArea = document.createElement('div');
  bugsArea.className = 'bugs-area';
  screen.appendChild(bugsArea);

  let counterBugs = 0;
  let intervalTime = 1000;

  const bugsInterval = setInterval(() => {
    createBug(bugsArea);
    counterBugs++;
    intervalTime -= intervalTime * 0.5;

    if (counterBugs === errors) {
      clearInterval(bugsInterval);
      document.querySelector('#room').style.display = 'none';
      document.querySelector('#terminal').style.display = 'none';
      document.querySelector('#countdown-timer').style.display = 'none';
      nineOneOne();
    }
  }, intervalTime);
};

export default Release;
