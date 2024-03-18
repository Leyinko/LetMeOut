import { Lose } from '../../pages/Result/Result';
import './Countdown.css';

const gameTime = 10;
let remainingTime = gameTime * 60;
let subtractTime = 0;
const app = document.getElementById('app');

const Countdown = () => {
  // Template
  const timer = document.createElement('span');
  timer.id = 'countdown-timer';

  app.appendChild(timer);

  // Functionality
  const interval = setInterval(() => {
    let minutes = Math.floor(remainingTime / 60);
    let seconds = Math.round(remainingTime % 60);

    if (remainingTime >= 0) {
      minutes = minutes < gameTime ? '0' + minutes : minutes;
      seconds = seconds < gameTime ? '0' + seconds : seconds;

      timer.innerHTML = `${minutes}:${seconds}`;

      remainingTime--;
    } else {
      clearInterval(interval);
      Lose();
    }
  }, 1000);
};

export function handleTime(time, operation, percentage) {
  if (!percentage) {
    remainingTime = operation ? remainingTime + time : remainingTime - time;
  } else {
    remainingTime = remainingTime * time + 2;
    subtractTime = remainingTime * (1 - time);
  }

  const timerOperation = document.createElement('span');
  timerOperation.id = 'timer-operation';
  timerOperation.className = operation ? 'add-time' : 'subtract-time';
  timerOperation.textContent = !percentage ? (operation ? `+${time}` : `-${time}`) : `-${Math.round(subtractTime)}`;
  app.appendChild(timerOperation);
  setTimeout(() => {
    timerOperation.remove();
  }, 300);
}

export default Countdown;
