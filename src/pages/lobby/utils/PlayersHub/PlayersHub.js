import Button from '../../../../components/atoms/button/Button';
import MenuSelection from '../../../../components/atoms/menu/Menu';
import './PlayersHub.css';

const PlayersHub = (code, username) => {
  let main = document.querySelector('#lobby-main');

  const playersHub = document.createElement('div');
  playersHub.id = 'players-hub';

  setTimeout(() => {
    const lobby = document.querySelector('#lobby');

    main.insertAdjacentElement('afterbegin', playersHub);

    MenuSelection('CANCEL', 'cancel-lobby', lobby);
    let cancel = document.querySelector('.cancel-lobby');
    cancel.addEventListener('click', (e) => closePlayersHub(e));

    Button('READY', 'ready-button', 'submit', lobby);
    let ready = document.querySelector('.ready-button');
    ready.addEventListener('click', () => console.log('Ready or not..'));
  }, 1000);

  const room = document.createElement('span');
  room.className = 'room-code';
  room.textContent = `#${code.toUpperCase()}`;

  const player = document.createElement('h3');
  player.className = 'player';
  player.textContent = username.toUpperCase();

  const players = document.createElement('div');
  players.className = 'players';

  // TEST
  players.innerHTML = `
		<img id="p1" src="src/assets/pictures/P1.png">
		<img id="p2" src="src/assets/pictures/P2.png">
		<img id="p3" src="src/assets/pictures/P3.png">
	`;
  // TEST
  playersHub.append(room, player, players);
};

const closePlayersHub = () => {
  let lobby = document.querySelector('#players-hub');
  let cancel = document.querySelector('.cancel-lobby');
  let ready = document.querySelector('.ready-button');

  lobby && lobby.remove();
  cancel && cancel.remove();
  ready && ready.remove();

  let sections = document.querySelectorAll('article');
  sections.forEach((section) => section.classList.remove('out'));
};

export default PlayersHub;
