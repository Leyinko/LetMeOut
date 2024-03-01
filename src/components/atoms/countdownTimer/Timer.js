import './Timer.css';

const gameTime = 10;
let remainingTime = gameTime * 60;

function countdown() {
  const app = document.getElementById('app');

  // Template
  const timer = document.createElement('span');
  timer.id = 'countdown-timer';

  app.appendChild(timer);

  // Functionality
  const interval = setInterval(() => {
    let minutes = Math.floor(remainingTime / 60);
    let seconds = remainingTime % 60;

    if (remainingTime != 0) {
      minutes = minutes < gameTime ? '0' + minutes : minutes;
      seconds = seconds < gameTime ? '0' + seconds : seconds;

      timer.innerHTML = `${minutes}:${seconds}`;

      remainingTime--;
    } else {
      clearInterval(interval);
      alert('mueriste');
    }
  }, 1000);
}

export function handleTime(time, operation) {
  remainingTime = operation ? remainingTime + time : remainingTime - time;
}

export default countdown;
