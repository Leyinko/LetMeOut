import Button from '../../../components/atoms/button/Button';
import PlayersHub from './PlayersHub/PlayersHub';
import { generateRandomString } from '../../../../utils';
import sendRequest, { ws } from '../../../webSocket/webSocket';

const UserFieldsModal = (button, parent, ...field) => {
  let modal = document.createElement('div');
  modal.id = 'fields-modal';

  field.forEach((field) => (modal.innerHTML += field.join('')));

  parent.append(modal);

  Button(button, 'field-button', 'submit', modal);
  let submit = document.querySelector('.field-button');

  document
    .querySelector('#username')
    .addEventListener('input', (e) =>
      e.target.value ? submit.classList.add('granted') : submit.classList.remove('granted')
    );

  submit.addEventListener('click', (e) => {
    let username = document.querySelector('#username');
    let room = document.querySelector('#room');

    if (e.target.textContent === 'CREATE') {
      sendRequest('createLobby', username.value, generateRandomString());
    } else {
      sendRequest('joinLobby', username.value, room.value);
    }

    ws.onmessage = function (event) {
      const data = JSON.parse(event.data);
      !data.error ? launchLobby(data.lobbyCode, username.value, ws) : fieldError(room);
    };
  });
};

function launchLobby(code, username, ws) {
  let parent = document.querySelector('article');
  parent.addEventListener('transitionend', () => PlayersHub(code, username, ws), { once: true });

  let selections = document.querySelectorAll('article');
  selections.forEach((section) => section.classList.add('out'));
}

function fieldError(input) {
  setTimeout(() => input.classList.add('error'), 0) && setTimeout(() => input.classList.remove('error'), 1000);
}

export default UserFieldsModal;
