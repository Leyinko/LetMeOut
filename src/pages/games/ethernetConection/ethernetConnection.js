import { accessSound } from '../../../components/audio/Audio';
import { handleTime } from '../../../components/countdown/Countdown';
import { fisherYatesShuffle, random } from '../../../utils';
import './ethernetConnection.css';

export default function EthernetConnection() {
  const container = document.querySelector('#ethernet-game');

  if (!document.querySelector('#ethernet-container')) {
    const EthernetContainer = document.createElement('section');
    EthernetContainer.id = 'ethernet-container';

    let portOrder = [[], []];
    let selection = [];
    let pairs = [];

    for (let i = 0; i < 2; i++) {
      const ethernetPort = document.createElement('div');
      ethernetPort.id = `port${i}`;
      ethernetPort.className = `ethernet-port`;

      for (let pin = 0; pin < 8; pin++) {
        portOrder[i][pin] = pin;
      }

      const order = fisherYatesShuffle(portOrder[i]);

      order.forEach((element) => {
        const ethernetPin = document.createElement('div');
        ethernetPin.id = `E${element}`;
        ethernetPin.className = `ethernet-pin`;

        const pinBall = document.createElement('div');
        pinBall.id = `ball-${i}-${element}`;
        pinBall.className = 'pin-ball';

        pinBall.addEventListener('click', () => {
          if (!pairs.includes(pinBall.id)) {
            if (selection.length < 1) {
              selection.push(pinBall.id);
              markCheck(selection);
            } else if (selection.length == 1) {
              selection.push(pinBall.id);
              checkResult(selection, pairs, EthernetContainer);
              selection = [];
              markCheck(selection);
            }
          }
        });

        ethernetPin.appendChild(pinBall);
        ethernetPort.appendChild(ethernetPin);
      });

      EthernetContainer.appendChild(ethernetPort);
    }

    container.appendChild(EthernetContainer);
  }
}

function markCheck(selected) {
  let balls = document.querySelectorAll('.pin-ball');
  balls.forEach((ball) => ball.classList.remove('pin-ball-selected'));

  selected &&
    selected.forEach((element) => element && document.querySelector(`#${element}`).classList.add('pin-ball-selected'));
}

function checkResult(selection, pairs, node) {
  if (selection.length == 2) {
    let first = selection[0].match(/.$/)[0];
    let second = selection[1].match(/.$/)[0];

    let firstParent = selection[0].match(/-(\d+)-/)[1];
    let secondParent = selection[1].match(/-(\d+)-/)[1];

    if (first == second && firstParent != secondParent) {
      pairs.push(selection[0], selection[1]);
      document.querySelector(`#${selection[0]}`).classList.add('pin-ball-check');
      document.querySelector(`#${selection[1]}`).classList.add('pin-ball-check');
    } else {
      accessSound('error') && handleTime(20, false);
    }
  }

  if (pairs.length == 16) {
    let container = document.querySelector('#ethernet-game');

    accessSound('success');

    const access = document.createElement('h2');
    access.textContent = `${accessCode()}`;
    node.innerHTML = '';

    let superposition = document.createElement('img');
    superposition.className = 'superposition';
    superposition.src = '/assets/images/pictures/console/Windows/ethernet-success.png';

    container.appendChild(superposition);

    setTimeout(() => container.appendChild(access), 500);
  }
}

// Chat Code Access
export function accessCode() {
  let code = random(9, 6).join('');
  document.querySelector('#connect').setAttribute('code', code);
  return code;
}
