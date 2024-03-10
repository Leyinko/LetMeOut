import Button from '../../../../components/button/Button';
import PlayersHub from '../Hub/Hub';
import { generateRandomString } from '../../../../utils';
import sendRequest, { ws } from '../../../../data/webSocket/webSocket';
import './User.css';

const UserFieldsModal = (button, parent, ...field) => {
  let modal = document.createElement('div');
  modal.id = 'fields-modal';

  field.forEach((field) => (modal.innerHTML += field.join('')));

  parent.append(modal);

  Button(button, 'field-button', 'lobby-buttons', 'submit', modal);
  let submit = document.querySelector('.field-button');

  let inputs = document.querySelectorAll('input');
  fieldsControl(inputs, submit);

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
      const tag = /[a-zA-Z]*/.exec(data.message);
      !data.error ? launchLobby(data.lobbyCode, username.value, data) : serverError(data.message, tag[0]);
    };
  });
};

function launchLobby(code, username, party) {
  let parent = document.querySelector('article');
  parent.addEventListener('transitionend', () => PlayersHub(code, username, party), { once: true });

  let selections = document.querySelectorAll('article');
  selections.forEach((section) => section.classList.add('out'));
}

function fieldsControl(inputs, button) {
  [...inputs].forEach((input) => {
    input.addEventListener('input', (e) => {
      if (e.target && e.target.closest('article').id === 'create-party') {
        input.value ? button.classList.add('granted') : button.classList.remove('granted');
      } else {
        [...inputs].every((input) => input.value)
          ? button.classList.add('granted')
          : button.classList.remove('granted');
      }
    });
    input.addEventListener('keydown', (e) => {
      e.key === 'Tab' && e.preventDefault();
      e.key === 'Enter' && document.querySelector('button').click();
    });
  });
}

function serverError(message, tag) {
  let target = document.querySelector(`#${tag.toLowerCase()}`) || document.querySelector(`.field-button`);
  let inputs = document.querySelectorAll('input');

  let error = document.createElement('span');
  error.className = 'error-field';
  error.textContent = message.toUpperCase();

  target &&
    setTimeout(() => target.classList.add('error'), 0) &&
    setTimeout(() => target.classList.remove('error'), 1000);

  !document.querySelector('.error-field') && target.insertAdjacentElement('afterend', error);

  inputs.forEach((input) => {
    input.addEventListener('click', () => error.remove(), { once: true });
  });
}

export default UserFieldsModal;
