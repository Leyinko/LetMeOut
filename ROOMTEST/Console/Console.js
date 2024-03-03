import ChatBox from '../../src/pages/Lobby/utils/Chat/Chat';
import './Console.css';

const Terminal = (parent) => {
  // Console
  const terminal = document.querySelector('#console');
  terminal.style.pointerEvents = 'all';
  terminal.addEventListener('click', () => container.classList.add('opened'));

  const container = document.createElement('section');
  container.id = 'terminal';

  parent.appendChild(container);

  // Screen
  const screen = document.createElement('article');
  screen.id = 'screen';

  container.appendChild(screen);

  // Elements
  // > ID
  const id = document.createElement('h3');
  id.textContent = '#4560-GR-77';

  screen.appendChild(id);

  // > Chat
  // const com = document.createElement('img');
  // com.setAttribute('role', 'button');
  // com.className = 'chat-icon';
  // com.src = 'src/assets/images/icons/menu/chat.svg';

  // com.addEventListener('click', (e) => {
  //   e.target.classList.toggle('on');
  //   ChatBox(id.textContent, screen);
  // });

  // screen.appendChild(com);

  // > Actions
  const actionsContainer = document.createElement('div');
  actionsContainer.id = 'actions-container';

  actionsContainer.innerHTML = `
		<div role="button"></div>
		<div role="button"></div>
		<div role="button"></div>
	`;

  screen.appendChild(actionsContainer);

  // > USB
  const folder = document.createElement('div');
  folder.className = 'folder';

  folder.addEventListener('click', () => console.log('WILL SEE'));

  screen.appendChild(folder);

  // > Logo
  const logo = document.createElement('img');
  logo.src = 'src/assets/images/logos/IANA-logo.png';
  logo.className = 'logo';

  screen.appendChild(logo);

  // > Exit
  const exit = document.createElement('span');
  exit.innerText = 'EXIT';
  exit.className = 'exit';
  exit.addEventListener('click', () => container.classList.remove('opened'));

  screen.appendChild(exit);
};

export default Terminal;
