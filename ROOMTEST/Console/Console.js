import ChatBox from '../../src/pages/Lobby/utils/Chat/Chat';
import { animationReflow } from '../../utils';
import './Console.css';

const Terminal = (parent) => {
  // Opening Handler
  const tv = document.querySelector('#console');
  tv.style.pointerEvents = 'all';

  tv.addEventListener('click', () => {
    terminal.classList.add('opened');
    animationReflow(terminal, 'players-hub-appearance 1s ease-in-out');
  });

  // Console
  const terminal = document.createElement('section');
  terminal.id = 'terminal';

  parent.appendChild(terminal);

  // Screen
  const screen = document.createElement('article');
  screen.id = 'screen';

  terminal.appendChild(screen);

  screen.addEventListener('click', (e) => {
    console_actions.hasOwnProperty(e.target.id) && console_actions[e.target.id](screen);
  });

  // Elements

  // > ID
  const id = document.createElement('h3');
  id.className = 'id';
  id.textContent = '#4560-GR-77';

  screen.appendChild(id);

  // > Folder
  const folder = document.createElement('img');
  folder.src = 'src/assets/images/icons/console/Folder.png';
  folder.id = 'folder';

  screen.appendChild(folder);

  // > Panel
  const panel = document.createElement('div');
  panel.className = 'panel';

  let icons = [
    '/src/assets/images/icons/console/transfer.svg',
    '/src/assets/images/icons/console/connect.svg',
    '/src/assets/images/icons/console/fix.svg',
    '/src/assets/images/icons/console/restart.svg',
  ];

  icons.forEach((icon) => {
    const action = document.createElement('img');
    action.src = icon;
    action.id = icon.match(/[a-z]*(?=\.)/)[0];
    panel.appendChild(action);
  });

  screen.appendChild(panel);

  // > Exit
  const exit = document.createElement('img');
  exit.src = 'src/assets/images/icons/console/turn-off.svg';
  exit.className = 'exit';

  exit.addEventListener('click', () => terminal.classList.remove('opened'));

  screen.appendChild(exit);
};

const console_actions = {
  folder: (parent) => {
    if (!document.querySelector('#window-usb')) {
      const window = document.createElement('div');
      window.id = 'window-usb';
      window.classList.add('onscreen');

      parent.appendChild(window);

      const close = document.createElement('span');
      close.textContent = `🔲`;

      close.addEventListener('click', () => window.classList.remove('onscreen'));

      window.appendChild(close);
    } else {
      document.querySelector('#window-usb').classList.add('onscreen');
    }
  },
  transfer: (parent) => {
    if (!document.querySelector('#time-transfer')) {
      const window = document.createElement('div');
      window.id = 'time-transfer';
      window.classList.add('onscreen');

      parent.appendChild(window);

      const close = document.createElement('span');
      close.textContent = `🔲`;

      close.addEventListener('click', () => window.classList.remove('onscreen'));

      window.appendChild(close);
    } else {
      document.querySelector('#time-transfer').classList.add('onscreen');
    }
  },
  connect: (parent) => ChatBox(document.querySelector('.id').textContent, parent),
  fix: (parent) => {
    if (!document.querySelector('#repair')) {
      const window = document.createElement('div');
      window.id = 'repair';
      window.classList.add('onscreen');

      parent.appendChild(window);

      const close = document.createElement('span');
      close.textContent = `🔲`;

      close.addEventListener('click', () => window.classList.remove('onscreen'));

      window.appendChild(close);
    } else {
      document.querySelector('#repair').classList.add('onscreen');
    }
  },
  restart: () => console.log('Restart button clicked'),
};

export default Terminal;
