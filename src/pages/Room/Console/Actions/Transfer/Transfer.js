import { playSound } from '../../../../../components/atoms/audio/Audio';
import sendRequest from '../../../../../webSocket/webSocket';
import './Transfer.css';

const Transfer = () => {
  // Parent
  let parent = document.querySelector('#time-transfer');

  if (!document.querySelector('#transfer-panel')) {
    // Container
    let container = document.createElement('div');
    container.id = 'transfer-panel';

    parent.appendChild(container);

    // Button
    const button = document.createElement('button');
    button.textContent = 'Download';

    container.appendChild(button);

    button.addEventListener('click', () => {
      // Remove
      button.remove();

      // Downloading Bar
      const bar = document.createElement('div');
      container.appendChild(bar);

      let blocks = 23;

      let download = setInterval(() => {
        let bar = document.querySelector('#transfer-panel div');

        let block = document.createElement('div');
        block.className = 'downloading-block';

        bar.appendChild(block);
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
      }, 50);
    });
  }
};

function sendTime(input) {
  let window = document.querySelector('#time-transfer');
  let IDS = JSON.parse(localStorage.getItem('data')).players.map((player) => player.id.toUpperCase());

  if (!IDS.includes(input.value.toUpperCase()) && input.value.length === 11) {
    transferInputError('NO CONSOLE FOUND');
  } else if (input.value.length < 11) {
    transferInputError('INVALID SYNTAX');
  } else {
    // Send
    sendRequest('shareTime', null, null, null, input.value);

    // Reset
    window.style.background = `url('src/assets/images/pictures/console/windows/time-transferred.png') center/contain no-repeat`;
    window.style.animation = 'glitch 0.3s forwards';

    let sound = new Audio('src/assets/audio/sounds/rooms/time-sent.mp3');
    playSound(sound);

    input.remove();
  }
}

function transferInputError(text) {
  let panel = document.querySelector('#transfer-panel');

  const error = document.createElement('p');
  error.textContent = text;

  panel.appendChild(error);

  setTimeout(() => error.remove(), 1500);
}

export default Transfer;
