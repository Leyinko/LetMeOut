import sendRequest from '../../data/webSocket/webSocket';
import { playSound } from '../audio/Audio';
import './Countdown.css';

const gameTime = 15;
export let remainingTime = gameTime * 60;

const Countdown = () => {
  // Reset
  remainingTime = gameTime * 60;

  // Template
  const timer = document.createElement('span');
  timer.id = 'countdown-timer';

  document.getElementById('app').appendChild(timer);

  // Functionality
  var interval = setInterval(() => {
    if (document.querySelector('#countdown-timer')) {
      let minutes = Math.floor(remainingTime / 60);
      let seconds = remainingTime % 60;

      if (remainingTime > 0) {
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        timer.innerHTML = `${minutes}:${seconds}`;

        remainingTime--;

        if (remainingTime === 3) {
          setTimeout(() => {
            const lastAudio = new Audio('/assets/audio/sounds/lobby/Clock-loading.mp3');
            playSound(lastAudio);
          }, 500);
        }
      } else {
        clearInterval(interval);
        // Game Lost
        sendRequest('lose');
      }
    } else {
      clearInterval(interval);
    }
  }, 1000);
};

export function handleTime(time, operation) {
  let room = document.querySelector('#room');

  remainingTime = operation ? remainingTime + time : remainingTime - time;

  const timerOperation = document.createElement('span');
  timerOperation.id = 'timer-operation';
  timerOperation.className = operation ? 'add-time' : 'subtract-time';
  timerOperation.textContent = operation ? `+${time}` : `-${time}`;

  room && room.appendChild(timerOperation);

  setTimeout(() => timerOperation.remove(), 700);
}

export default Countdown;
