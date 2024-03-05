import { animationReflow } from '../../../../utils';
import { getLocalID } from '../../../localStorage/LS';
import { ws } from '../../../webSocket/webSocket';
import Games from '../../games/games';
import Transfer from './Actions/Transfer/Transfer';
import ChatBox, { chatMessage } from './Chat/Chat';
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
  id.textContent = getLocalID() ?? '#XXXX-XX-DEV';

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
    // Window
    createWindow('window-usb', parent);
  },
  transfer: (parent) => {
    // Window
    createWindow('time-transfer', parent);
    // Action
    Transfer();
  },
  connect: (parent) => {
    // Window
    createWindow('chat', parent);

    const chat = document.querySelector('#chat');
    const messages = document.querySelector('.messages');
    // Start Chat
    !messages && ChatBox(document.querySelector('.id').textContent, chat);
    //
    ws.onmessage = function (event) {
      const current = JSON.parse(event.data);
      chatMessage(current.name, current.message);
    };
  },
  fix: (parent) => {
    // Window
    createWindow('repair', parent);
    // Action
    let container = document.querySelector('#repair');
    let games = document.querySelector('.games-modal');

    // Conditionals
    !games && Games(container);
  },
  restart: (parent) => {
    // Window
    createWindow('reboot', parent);
  },
};

function createWindow(id, parent) {
  if (!document.querySelector(`#${id}`)) {
    const window = document.createElement('div');
    window.id = id;
    window.classList.add('onscreen');

    parent.appendChild(window);

    const close = document.createElement('span');
    close.textContent = `🔲`;

    close.addEventListener('click', () => window.classList.remove('onscreen'));

    window.appendChild(close);
  } else {
    !document.querySelector(`#${id}`).classList.add('onscreen');
  }
}
export default Terminal;
