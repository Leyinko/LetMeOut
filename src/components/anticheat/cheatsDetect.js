import { playSound, stopSound } from '../audio/Audio';
import { handleTime, remainingTime } from '../countdown/Countdown';

const blurSound = new Audio('/assets/audio/sounds/console/window-blur.mp3');

export default function cheatDetect() {
  let interval;
  window.addEventListener('blur', () => {
    const timer = document.querySelector('#countdown-timer');

    interval = setInterval(() => {
      document.title = `${timer.textContent} 👁️`;
      handleTime(40, false, false);

      if (remainingTime <= 0) {
        stopSound(blurSound);
        clearInterval(interval);
      }
    }, 1000);

    interval && playSound(blurSound);
  });
  window.addEventListener('focus', () => {
    clearInterval(interval);
    document.title = 'letmeout';
    stopSound(blurSound);
  });
}
