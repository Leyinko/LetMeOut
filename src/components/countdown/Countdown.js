import { Lose } from '../../pages/Result/Result';
import { playSound } from '../audio/Audio';
import './Countdown.css';

const app = document.getElementById('app');
const gameTime = 10;
let remainingTime = gameTime * 60;

const Countdown = () => {
  // Template
  const timer = document.createElement('span');
  timer.id = 'countdown-timer';

  app.appendChild(timer);

  // Functionality
  const interval = setInterval(() => {
    let minutes = Math.floor(remainingTime / 60);
    let seconds = remainingTime % 60;

    if (remainingTime >= 0) {
      minutes = minutes < gameTime ? '0' + minutes : minutes;
      seconds = seconds < gameTime ? '0' + seconds : seconds;

      timer.innerHTML = `${minutes}:${seconds}`;

      remainingTime--;

      if (remainingTime <= 3) {
        const lastAudio = new Audio('src/assets/audio/sounds/lobby/Clock-loading.mp3');
        playSound(lastAudio);
      }
    } else {
      clearInterval(interval);
      Lose();
    }
  }, 1000);
};

export function handleTime(time, operation) {
  remainingTime = operation ? remainingTime + time : remainingTime - time;

  const timerOperation = document.createElement('span');
  timerOperation.id = 'timer-operation';
  timerOperation.className = operation ? 'add-time' : 'subtract-time';
  timerOperation.textContent = operation ? `+${time}` : `-${time}`;
  app.appendChild(timerOperation);
  setTimeout(() => {
    timerOperation.remove();
  }, 300);
}

export default Countdown;
