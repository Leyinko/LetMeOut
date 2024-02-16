import { copyText } from '../../../../../utils';
import Button from '../../../../components/atoms/button/Button';
import Menu from '../../../../components/atoms/menu/Menu';
import sendRequest, { ws } from '../../../../webSocket/webSocket';
import './Hub.css';

const PlayersHub = (code, username, party) => {
  const lobby = document.querySelector('#lobby');
  const main = document.querySelector('#lobby-main');

  const playersHub = document.createElement('div');
  playersHub.id = 'players-hub';

  main.insertAdjacentElement('afterbegin', playersHub);

  const room = document.createElement('span');
  room.className = 'room-code';
  room.textContent = code;

  // ! TEST CHAT

  const chat = document.createElement('img');
  chat.src = 'src/assets/images/icons/menu/chat.svg';
  chat.className = 'chat-code';

  chat.addEventListener('click', (e) => {
    e.target.classList.toggle('on');

    const chatContainer = document.createElement('div');
    chatContainer.id = 'chat-container';

    const messages = document.createElement('ul');
    messages.className = 'messages';

    const inputMessage = document.createElement('input');
    inputMessage.id = 'chat-test-value';
    inputMessage.type = 'text';

    inputMessage.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        let message = document.querySelector('#chat-test-value');
        sendRequest('chatMessage', username, null, null, message.value);
        message.value = '';
      }
    });

    ws.onmessage = function (event) {
      let data = JSON.parse(event.data);
      if (data.tag === 'chat') {
        let littleContainer = document.createElement('li');
        littleContainer.id = 'little-container';

        let sender = document.createElement('h4');
        sender.textContent = data.name;

        let content = document.createElement('span');
        content.textContent = data.message;

        littleContainer.append(sender, content);

        messages.appendChild(littleContainer);

        messages.scrollTop = messages.scrollHeight;
      }
    };

    chatContainer.append(messages, inputMessage);

    e.target.classList.contains('on')
      ? lobby.appendChild(chatContainer)
      : document.querySelector('#chat-container').remove();
  });

  main.appendChild(chat);

  // ! TEST CHAT

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

  playersHub.append(room, nickname, players);

  Button('READY', 'ready-button', 'submit', playersHub);
  let ready = document.querySelector('.ready-button');
  ready.addEventListener('click', () => toggleReadyState(ready, code, username));

  Menu('CANCEL', 'cancel-lobby', lobby);
  let cancel = document.querySelector('.cancel-lobby');
  cancel.addEventListener('click', () => {
    sendRequest('exitLobby', username, code);
    closePlayersHub(playersHub, ready, cancel);
  });

  updateReadyState(party);

  ws.onmessage = function (event) {
    const current = JSON.parse(event.data);
    updateReadyState(current);
  };
};

function toggleReadyState(ready, code, username) {
  ready.classList.toggle('ready');
  const buttonState = ready.classList.contains('ready') ? true : false;
  sendRequest('playerState', username, code, buttonState);
}

function updateReadyState(data) {
  let players = document.querySelectorAll('.players img');
  let length = data.players.length;
  data.players.forEach((player, index) => {
    if (length === 0 || length > 3) return;
    player && player.ready ? (players[index].style.opacity = '1') : (players[index].style.opacity = '');
  });
}

const closePlayersHub = (...elements) => {
  [...elements].forEach((element) => element && element.remove());

  let sections = document.querySelectorAll('article');
  sections.forEach((section) => section.classList.remove('out'));
};

export default PlayersHub;
