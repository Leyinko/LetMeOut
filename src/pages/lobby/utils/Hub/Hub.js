import Room from '../../../../../ROOMTEST/Room';
import { copyText } from '../../../../../utils';
import Button from '../../../../components/atoms/button/Button';
import Menu from '../../../../components/atoms/menu/Menu';
import sendRequest, { ws } from '../../../../webSocket/webSocket';
import { preIntro } from '../../../Intro/Intro';
import ChatBox, { chatMessage } from '../Chat/Chat';
import './Hub.css';

const PlayersHub = (code, username, party) => {
  const lobby = document.querySelector('#lobby');
  const main = document.querySelector('#lobby-main');

  if (!document.querySelector('#players-hub')) {
    const playersHub = document.createElement('div');
    playersHub.id = 'players-hub';
    main.insertAdjacentElement('afterbegin', playersHub);

    const room = document.createElement('span');
    room.className = 'room-code';
    room.textContent = code;

    const copy = document.createElement('img');
    copy.src = 'src/assets/images/icons/menu/copy.svg';
    copy.className = 'copy-code';

    copy.addEventListener('click', () => copyText());

    room.appendChild(copy);

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

    const chat = document.createElement('img');
    chat.setAttribute('role', 'button');
    chat.className = 'chat-icon';
    chat.src = 'src/assets/images/icons/menu/chat.svg';

    chat.addEventListener('click', (e) => {
      e.target.classList.toggle('on');
      ChatBox(username, playersHub);
    });

    playersHub.append(room, nickname, players, chat);

    Button('', 'ready-button', 'lobby-buttons', 'submit', lobby);
    let ready = document.querySelector('.ready-button');
    ready.addEventListener('click', () => toggleReadyState(ready, code, username));

    Menu('CANCEL', 'cancel-lobby', lobby);
    let cancel = document.querySelector('.cancel-lobby');
    cancel.addEventListener('click', () => {
      sendRequest('exitLobby', username, code);
      setTimeout(() => closePlayersHub(playersHub, ready, cancel), 100);
    });

    updateReadyState(party);

    ws.onmessage = function (event) {
      const current = JSON.parse(event.data);
      if (current.tag === 'chat') {
        chatMessage(current.name, current.message);
      } else {
        updateReadyState(current);
        allPlayersReady();
      }
    };
  }
};

function toggleReadyState(ready, code, username) {
  ready.classList.toggle('ready');
  const buttonState = ready.classList.contains('ready') ? true : false;
  sendRequest('playerState', username, code, buttonState);
}

function updateReadyState(data) {
  let players = document.querySelectorAll('.players img');
  data.players.forEach((player, index) => {
    player.ready ? (players[index].style.opacity = '0.9') : (players[index].style.opacity = '');
  });
}

function allPlayersReady() {
  let players = Array.from(document.querySelectorAll('.players img'));
  let confirm = new Audio('src/assets/audio/sounds/lobby/Confirm-game.mp3');
  let ready = players.every((player) => player.style.opacity === '0.9');

  ready && preIntro(confirm);
}

const closePlayersHub = (...elements) => {
  [...elements].forEach((element) => element && element.remove());

  let sections = document.querySelectorAll('article');
  sections.forEach((section) => section.classList.remove('out'));
};

export default PlayersHub;
