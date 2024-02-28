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
  setInterval(() => {
    let minutes = Math.floor(remainingTime / 60);
    let seconds = remainingTime % 60;

    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    timer.innerHTML = `${minutes}:${seconds}`;

    remainingTime--;
  }, 1000);
}

export default countdown;
