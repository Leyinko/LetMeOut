import sendRequest from '../../../../../webSocket/webSocket';
import './Transfer.css';

const Transfer = () => {
  // Parent
  let parent = document.querySelector('#time-transfer');

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

      if (Math.floor(blocks) === 0) {
        // Remove
        clearInterval(download);
        bar.remove();

        const input = document.createElement('input');
        input.type = 'text';
        input.id = 'user-time-receiver';

        input.addEventListener('keydown', (e) => e.key === 'Enter' && sendTime());

        document.querySelector('#transfer-panel').appendChild(input);
      }
    }, 2000);
  });
};

function sendTime() {
  // console.log('Here');
  // let input = document.querySelector('#user-time-receiver');
  // sendRequest('shareTime', null, null, null, input.value);
  // input.value = '';
}

export default Transfer;
