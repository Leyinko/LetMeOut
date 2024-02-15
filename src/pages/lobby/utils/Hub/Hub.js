import Button from '../../../../components/atoms/button/Button';
import Menu from '../../../../components/atoms/menu/Menu';
import sendRequest, { ws } from '../../../../webSocket/webSocket';
import './Hub.css';

const PlayersHub = (code, username) => {
  const lobby = document.querySelector('#lobby');
  const main = document.querySelector('#lobby-main');

  const playersHub = document.createElement('div');
  playersHub.id = 'players-hub';

  main.insertAdjacentElement('afterbegin', playersHub);

  const room = document.createElement('span');
  room.className = 'room-code';
  room.textContent = code;

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

  Button('READY', 'ready-button', 'submit', playersHub);
  let ready = document.querySelector('.ready-button');
  ready.addEventListener('click', () => toggleReadyState(ready, code, username));

  ws.onmessage = function (event) {
    let players = document.querySelectorAll('.players img');
    const data = JSON.parse(event.data);

    console.log(data);

    data.players &&
      data.players.forEach((player, index) => {
        if (player.ready) {
          players[index].style.opacity = '1';
        } else {
          players[index].style.opacity = '';
        }
      });
  };

  Menu('CANCEL', 'cancel-lobby', lobby);
  let cancel = document.querySelector('.cancel-lobby');
  cancel.addEventListener('click', () => {
    sendRequest('exitLobby', username, code);
    closePlayersHub(playersHub, ready, cancel);
  });
};

function toggleReadyState(ready, code, username) {
  ready.classList.toggle('ready');
  const buttonState = ready.classList.contains('ready') ? true : false;
  sendRequest('playerState', username, code, buttonState);
}

const closePlayersHub = (...elements) => {
  [...elements].forEach((element) => element && element.remove());

  let sections = document.querySelectorAll('article');
  sections.forEach((section) => section.classList.remove('out'));
};

export default PlayersHub;
