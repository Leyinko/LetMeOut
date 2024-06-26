import { accessSound, playSound } from '../../../../../components/audio/Audio';
import sendRequest from '../../../../../data/webSocket/webSocket';
import './Transfer.css';

const Transfer = () => {
  // Parent
  let parent = document.querySelector('#time-transfer');

  if (!document.querySelector('#transfer-panel')) {
    let container = document.createElement('div');
    container.id = 'transfer-panel';

    parent.appendChild(container);

    const button = document.createElement('button');
    button.textContent = 'Download';

    container.appendChild(button);

    button.addEventListener('click', () => {
      // Remove
      button.remove();

      // Downloading Bar
      const bar = document.createElement('div');
      container.appendChild(bar);

      let blocks = 20;

      let download = setInterval(() => {
        let bar = document.querySelector('#transfer-panel div');

        if (bar) {
          let block = document.createElement('div');
          block.className = 'downloading-block';

          bar && bar.appendChild(block);
          blocks--;

          if (blocks === 0) {
            // Remove
            clearInterval(download);
            bar.remove();

            // Input
            const input = document.createElement('input');
            input.type = 'text';
            input.id = 'user-time-receiver';
            input.maxLength = 11;

            input.addEventListener('keydown', (e) => e.key === 'Enter' && sendTime(input));

            document.querySelector('#transfer-panel').appendChild(input);
          }
        }
      }, 2250);
    });
  }

  return true;
};

export default Transfer;

function sendTime(input) {
  let window = document.querySelector('#time-transfer');
  let IDS = JSON.parse(localStorage.getItem('data')).players.map((player) => player.id.toUpperCase());
  let self = document.querySelector('.id');

  if ((!IDS.includes(input.value.toUpperCase()) && input.value.length === 11) || input.value === self.textContent) {
    transferInputError('NO AVAILABLE CONSOLE');
  } else if (input.value.length < 11) {
    transferInputError('INVALID SYNTAX');
  } else {
    // Send
    sendRequest('shareTime', null, null, null, null, self.textContent, input.value);

    // Reset
    window.style.background = `url('/assets/images/pictures/console/Windows/time-transferred.png') center/contain no-repeat`;
    window.style.animation = 'glitch 0.3s forwards';

    let sound = new Audio('/assets/audio/sounds/console/success.mp3');
    playSound(sound);

    input.remove();
  }
}

function transferInputError(text) {
  let panel = document.querySelector('#transfer-panel');

  if (!document.querySelector('#transfer-panel p')) {
    const error = document.createElement('p');
    error.textContent = text;

    panel.appendChild(error);

    accessSound('error');

    setTimeout(() => error.remove(), 1500);
  }
}
