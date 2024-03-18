import { playSound, stopSound } from '../audio/Audio';
import { handleTime } from '../countdown/Countdown';

let interval = undefined;
const speedUpTheme = new Audio('src/assets/audio/music/timerSpeedUp.mp3');

export default function cheatDetect() {
  window.addEventListener('blur', () => {
    console.log('Fuera de pagina');
    startSpeedUp();
  });

  window.addEventListener('focus', () => {
    console.log('dentro de pagina');
    stopSpeedUp();
  });
}

function startSpeedUp() {
  const timer = document.querySelector('#countdown-timer');

  interval =
    timer &&
    setInterval(() => {
      const minutes = timer.textContent.match(/^\d{2}/);
      const seconds = timer.textContent.match(/\d{2}$/);

      document.title = `${timer.textContent} 👁️`;
      // minutes != '00' && parseInt(seconds) > 10 && handleTime(10, false, false);
      if (minutes != '00') {
        handleTime(10, false, false);
      } else {
        seconds > 10 && handleTime(10, false, false);
      }
    }, 1000);

  interval && playSound(speedUpTheme);
}
function stopSpeedUp() {
  document.title = 'letmeout';
  stopSound(speedUpTheme);
  clearInterval(interval);
}
