import Button from '../../../../components/atoms/button/Button';
import Menu from '../../../../components/atoms/menu/Menu';
import './PlayersHub.css';

const PlayersHub = (code, username) => {
  const lobby = document.querySelector('#lobby');
  const main = document.querySelector('#lobby-main');

  const playersHub = document.createElement('div');
  playersHub.id = 'players-hub';

  main.insertAdjacentElement('afterbegin', playersHub);

  const room = document.createElement('span');
  room.className = 'room-code';
  room.textContent = `#${code.toUpperCase()}`;

  const nickname = document.createElement('h3');
  nickname.className = 'player';
  nickname.textContent = username.toUpperCase();

  const players = document.createElement('div');
  players.className = 'players';

  let player = 0;
  while (player < 3) {
    players.innerHTML += `<img class="p${player + 1}" src="src/assets/images/pictures/lobby/P${player + 1}.png">`;
    player++;
  }

  playersHub.append(room, nickname, players);

  Button('READY', 'ready-button', 'submit', lobby);
  let ready = document.querySelector('.ready-button');
  ready.addEventListener('click', () => console.log('Ready or not..'));

  Menu('CANCEL', 'cancel-lobby', lobby);
  let cancel = document.querySelector('.cancel-lobby');
  cancel.addEventListener('click', () => closePlayersHub(playersHub, ready, cancel));
};

const closePlayersHub = (...elements) => {
  [...elements].forEach((element) => element && element.remove());

  let sections = document.querySelectorAll('article');
  sections.forEach((section) => section.classList.remove('out'));
};

export default PlayersHub;
