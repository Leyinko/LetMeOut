import { playSound, stopSound } from '../audio/Audio';
import { handleTime } from '../countdown/Countdown';

let interval = undefined;
const blurSound = new Audio('src/assets/audio/sounds/window-blur.mp3');

export default function cheatDetect() {
  window.addEventListener('blur', () => startSpeedUp());
  window.addEventListener('focus', () => stopSpeedUp());
}

function startSpeedUp() {
  const timer = document.querySelector('#countdown-timer');

  interval =
    timer &&
    setInterval(() => {
      document.title = `${timer.textContent} 👁️`;
      handleTime(40, false, false);
    }, 1000);

  interval && playSound(blurSound);
}

function stopSpeedUp() {
  document.title = 'letmeout';
  stopSound(blurSound);
  clearInterval(interval);
}
