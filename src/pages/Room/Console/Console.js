import { animationReflow } from '../../../utils';
import { getLocalID } from '../../../data/localStorage/LS';
import Diskette from './Actions/Diskette/Diskette';
import Transfer from './Actions/Transfer/Transfer';
import Chat from './Chat/Chat';
import Repair from './Actions/Repair/Repair';
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

  screen.addEventListener(
    'click',
    (e) => console_actions.hasOwnProperty(e.target.id) && console_actions[e.target.id](screen)
  );

  // Elements
  const id = document.createElement('h3');
  id.className = 'id';
  id.textContent = getLocalID() ?? '#XXXX-XX-DEV';

  screen.appendChild(id);

  const folder = document.createElement('img');
  folder.src = 'src/assets/images/icons/console/Folder.png';
  folder.id = 'folder';

  screen.appendChild(folder);

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

  const exit = document.createElement('img');
  exit.src = 'src/assets/images/icons/console/turn-off.svg';
  exit.className = 'exit';

  exit.addEventListener('click', () => terminal.classList.remove('opened'));

  screen.appendChild(exit);
};

const console_actions = {
  folder: (parent) => createWindow('window-usb', parent) && Diskette(),
  transfer: (parent) => createWindow('time-transfer', parent) && Transfer(),
  connect: (parent) => createWindow('chat', parent) && Chat(),
  fix: (parent) => createWindow('repair', parent) && Repair(),
  restart: (parent) => createWindow('reboot', parent),
};

export function createWindow(id, parent) {
  if (!document.querySelector(`#${id}`)) {
    const window = document.createElement('div');
    window.id = id;
    window.classList.add('onscreen');

    parent.appendChild(window);

    const close = document.createElement('span');
    close.textContent = `🔲`;

    close.addEventListener('click', () => window.classList.remove('onscreen'));

    window.appendChild(close);
    // Window Created With Success ✔
    return true;
  } else {
    !document.querySelector(`#${id}`).classList.add('onscreen');
  }
}

export function createPasswordModal(id, parent) {
  const password = document.createElement('div');
  password.className = 'password';
  password.id = id;

  const input = document.createElement('input');
  input.type = 'text';
  input.maxLength = 9;

  password.appendChild(input);
  parent.appendChild(password);
}

export default Terminal;
