import Button from '../../../components/atoms/button/Button';
import PlayersHub from './PlayersHub/PlayersHub';
import { generateRandomString } from '../../../../utils';

export const ws = new WebSocket('ws://localhost:3000');

const UserFieldsModal = (button, parent, ...field) => {
  let modal = document.createElement('div');
  modal.id = 'fields-modal';

  field.forEach((field) => (modal.innerHTML += field.join('')));

  parent.append(modal);

  Button(button, 'field-button', 'submit', modal);
  let submit = document.querySelector('.field-button');

  submit.addEventListener('click', () => {
    let username = document.querySelector('#username').value;
    let room = document.querySelector('#room');
    let code = room?.value;

    let generated = generateRandomString();

    !room
      ? ws.send(JSON.stringify({ tag: 'createLobby', lobbyCode: generated, name: username }))
      : ws.send(JSON.stringify({ tag: 'joinLobby', lobbyCode: code, name: username }));

    ws.onmessage = function (event) {
      const data = JSON.parse(event.data);

      console.log(data);

      !data.error ? launchLobby(parent, code, generated, ws) : (document.querySelector('button').style.color = 'red');
    };
  });
};

function launchLobby(parent, code, generated, ws) {
  parent.addEventListener('transitionend', () => PlayersHub(code ?? generated, username, ws), { once: true });

  let selections = document.querySelectorAll('article');
  selections.forEach((section) => section.classList.add('out'));
}

export default UserFieldsModal;
