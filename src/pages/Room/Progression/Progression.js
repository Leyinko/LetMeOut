import { playSound } from '../../../components/audio/Audio';
import './Progression.css';

// Simple Input Tests ✔
export function passwordHandler(input, box) {
  let access = document.querySelector(`#${box}`);

  if (access.id === 'games-password') {
    let actives = Array.from(document.querySelectorAll('#active .got'));
    let code = /\-[0-9]*/;
    // Check Access
    actives.length >= 1 && actives.at(-1).src.match(code)[0].substring(1) == input.value
      ? granted() && access.remove()
      : denied();
  } else {
    let connect = document.querySelector('img#connect').getAttribute('code');
    // Check Access
    connect == input.value ? granted() && access.remove() : denied();
  }
}

// Access Granted/Denied Sounds
function granted() {
  let sound = new Audio('src/assets/audio/sounds/console/access-granted.mp3');
  playSound(sound);
  return true;
}

function denied() {
  let sound = new Audio('src/assets/audio/sounds/console/error.mp3');
  playSound(sound);

  // ! Time Lost
}
