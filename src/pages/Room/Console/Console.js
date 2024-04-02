import { animationReflow } from '../../../utils';
import { getUserData } from '../../../data/localStorage/LS';
import Diskette from './Actions/Diskette/Diskette';
import Transfer from './Actions/Transfer/Transfer';
import Chat from './Actions/Chat/Chat';
import Repair from './Actions/Repair/Repair';
import Reboot from './Actions/Reboot/Reboot';
import { nextStage, passwordHandler } from '../Progression/Progression';
import { mutationObserver } from './Actions/mutation-observer';
import './Console.css';

const Terminal = (parent) => {
  // Console
  const tv = document.querySelector('#console');
  tv.addEventListener(
    'click',
    () => animationReflow(terminal, 'players-hub-appearance 1s ease-in-out') && terminal.classList.add('opened')
  );

  // = Full Background
  const terminal = document.createElement('section');
  terminal.id = 'terminal';
  parent.appendChild(terminal);

  // = Elements Delimitation
  const screen = document.createElement('article');
  screen.id = 'screen';
  terminal.appendChild(screen);

  // Actions
  screen.addEventListener('click', (e) => {
    console_actions.hasOwnProperty(e.target.id) && console_actions[e.target.id](screen);
  });

  // ! Next Stage -> PROGRESSION !
  screen.addEventListener('click', () => nextStage('1'), { once: true });

  // Elements On Screen
  const id = document.createElement('h3');
  id.className = 'id';
  id.textContent = getUserData('id').toUpperCase() ?? '#XXXX-XX-DEV';

  screen.appendChild(id);

  // Diskette
  const folder = document.createElement('img');
  folder.src = '/assets/images/icons/console/Folder.png';
  folder.id = 'folder';

  screen.appendChild(folder);

  // Icons Panel
  const panel = document.createElement('div');
  panel.className = 'panel';

  let icons = [
    '/assets/images/icons/console/transfer.svg',
    '/assets/images/icons/console/connect.svg',
    '/assets/images/icons/console/fix.svg',
    '/assets/images/icons/console/restart.svg',
  ];

  icons.forEach((icon) => {
    const action = document.createElement('img');
    action.src = icon;
    action.id = icon.match(/[a-z]*(?=\.)/)[0];
    panel.appendChild(action);
  });

  screen.appendChild(panel);

  // Time Transfer (Exception PRINT PRIORITY)
  createWindow('time-transfer', screen) &&
    Transfer() &&
    document.querySelector('#time-transfer').classList.remove('onscreen');

  // Exit
  const exit = document.createElement('img');
  exit.src = '/assets/images/icons/console/turn-off.svg';
  exit.className = 'exit';

  exit.addEventListener('click', () => closeAllWindows(terminal));

  document.addEventListener('keydown', (e) => {
    e.key === 'Escape' && document.querySelector('#terminal').classList.contains('opened') && exit.click();
  });

  screen.appendChild(exit);
};

const console_actions = {
  folder: (parent) => createWindow('window-usb', parent) && Diskette(),
  transfer: () => document.querySelector(`#time-transfer`).classList.add('onscreen'),
  connect: (parent) =>
    createWindow('chat', parent) && createPasswordModal('chat-password', document.querySelector('#chat'), Chat),
  fix: (parent) =>
    createWindow('repair', parent) && createPasswordModal('games-password', document.querySelector('#repair'), Repair),
  restart: (parent) => createWindow('reboot', parent) && Reboot(),
};

function closeAllWindows(terminal) {
  let opened = document.querySelectorAll('.onscreen');
  opened.forEach((window) => window.classList.remove('onscreen'));

  terminal.classList.remove('opened');

  let inputs = document.querySelectorAll('input');
  inputs.forEach((input) => (input.value = ''));
}

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
    return true;
  } else {
    !document.querySelector(`#${id}`).classList.add('onscreen');
  }
}

export function createPasswordModal(id, parent, callback) {
  if (!document.querySelector(`#${id}`)) {
    const password = document.createElement('div');
    password.className = 'password';
    password.id = id;

    const input = document.createElement('input');
    input.type = 'text';
    input.maxLength = id === 'release' ? 15 : 9;

    input.addEventListener('keydown', (e) => e.key === 'Enter' && passwordHandler(input, id));

    password.appendChild(input);
    parent.appendChild(password);

    // Mutation Observer
    mutationObserver(parent.id, callback);
  }
}

export default Terminal;
