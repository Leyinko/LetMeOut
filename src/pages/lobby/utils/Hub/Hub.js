import { copyText } from '../../../../utils';
import { storeGameData } from '../../../../data/localStorage/LS';
import sendRequest, { ws } from '../../../../data/webSocket/webSocket';
import { preIntro } from '../../../Intro/Intro';
import { introduction_lobby } from '../../../Main/utils/Text';
import Room from '../../../Room/Room';
import Button from '../../../../components/button/Button';
import Menu from '../../../../components/menu/Menu';
import './Hub.css';

const PlayersHub = (code, username, party) => {
  const lobby = document.querySelector('#lobby');
  const main = document.querySelector('#lobby-main');

  if (!document.querySelector('#players-hub')) {
    const playersHub = document.createElement('div');
    playersHub.id = 'players-hub';
    main.insertAdjacentElement('afterbegin', playersHub);

    const room = document.createElement('span');
    room.id = 'room-code';
    room.textContent = code;

    const copy = document.createElement('img');
    copy.src = '/assets/images/icons/menu/copy.svg';
    copy.className = 'copy-code';

    copy.addEventListener('click', () => copyText('room-code'));

    room.appendChild(copy);

    const players = document.createElement('div');
    players.className = 'players';

    let player = 0;
    while (player < 3) {
      players.innerHTML += `
      <div>
        <h3></h3>
        <img class="p${player + 1}" src="/assets/images/pictures/lobby/P${player + 1}.png">
      </div>
      `;
      player++;
    }

    const introduction = document.createElement('div');
    introduction.className = 'intro-lobby';

    const text = document.createElement('span');
    text.textContent = introduction_lobby.intro;

    introduction.appendChild(text);

    playersHub.append(room, players, introduction);

    Button('', 'ready-button', 'lobby-buttons', 'submit', lobby);
    let ready = document.querySelector('.ready-button');
    ready.addEventListener('click', () => toggleReadyState(ready, code, username));

    Menu('CANCEL', 'cancel-lobby', lobby);
    let cancel = document.querySelector('.cancel-lobby');
    cancel.addEventListener('click', () => {
      sendRequest('exitLobby', username, code);
      setTimeout(() => closePlayersHub(playersHub, ready, cancel), 100);
    });

    // First Data Update
    updateReadyState(party);
    setPlayerName(party);

    // Hub WS
    ws.onmessage = function (event) {
      const current = JSON.parse(event.data);
      if (current.tag === 'playerState') {
        // States
        updateReadyState(current);
        allPlayersReady(current, username.toLowerCase());
      } else if (current.tag === 'assignRoom') {
        // Save Data at Start
        storeGameData(current, username);
      } else {
        // Players Info
        setPlayerName(current);
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
    player.ready ? (players[index].style.opacity = '0.85') : (players[index].style.opacity = '');
  });
}

function setPlayerName(data) {
  let players = document.querySelectorAll('.players div h3');
  for (let i = 0; i < 3; i++) {
    players[i] && (players[i].textContent = data.players[i] ? data.players[i].name : '');
  }
}

async function allPlayersReady(data, username) {
  let players = Array.from(document.querySelectorAll('.players img'));
  let confirm = new Audio('/assets/audio/sounds/lobby/Confirm-game.mp3');
  let ready = players.every((player) => player.style.opacity === '0.85');

  if (ready) {
    // Room Assign
    sendRequest('assignRoom', username, data.lobbyCode);
    // Generate Final Code
    sendRequest('generateFinalCode');
    // Start
    preIntro(confirm);
  }

  // ! Solo Launch Test
  // sendRequest('assignRoom', username, data.lobbyCode);
  // sendRequest('generateFinalCode');
  // document.querySelector('section').remove();
  // setTimeout(() => Room(), 1000);
  // ! Intro OR Not >
  // preIntro(confirm);
  // ! Solo Launch Test
}

const closePlayersHub = (...elements) => {
  [...elements].forEach((element) => element && element.remove());

  let sections = document.querySelectorAll('article');
  sections.forEach((section) => section.classList.remove('out'));
};

export default PlayersHub;
