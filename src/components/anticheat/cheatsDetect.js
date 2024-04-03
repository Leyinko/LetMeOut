import { playSound, stopSound } from '../audio/Audio';
import { handleTime } from '../countdown/Countdown';

export let interval = undefined;
const blurSound = new Audio('/assets/audio/sounds/console/window-blur.mp3');

export default function cheatDetect() {
  window.addEventListener('blur', () => startSpeedUp());
  window.addEventListener('focus', () => stopSpeedUp());
}

export function initiateAntiCheat() {
  interval && stopSpeedUp();
  cheatDetect();
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

export function stopSpeedUp() {
  document.title = 'letmeout';
  stopSound(blurSound);
  clearInterval(interval);
}
