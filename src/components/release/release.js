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
let counterBugs = 0;
let intervalTime = 1000;

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
  }, 17000);
};

// Function Release IANA
const Release = () => {
  const screen = document.getElementById('screen');
  //Bugs creation
  const bugsArea = document.createElement('div');
  bugsArea.className = 'bugs-area';
  screen.appendChild(bugsArea);

  const bugsInterval = setInterval(() => {
    document.querySelector('#the-prospector').muted = true;
    document.querySelector('#countdown-timer').style.display = 'none';
    createBug(bugsArea);
    counterBugs++;
    intervalTime = Math.floor((intervalTime /= 1.1));
    console.log(intervalTime);

    // Release IANA
    if (counterBugs === errors) {
      clearInterval(bugsInterval);
      document.querySelector('#room').remove();
      document.querySelector('#terminal').remove();
      nineOneOne();
    }
  }, intervalTime);
};

export default Release;
