import Button from '../../../components/atoms/button/Button';
import PlayersHub from './PlayersHub/PlayersHub';

const UserFieldsModal = (button, parent, ...field) => {
  let modal = document.createElement('div');
  modal.id = 'fields-modal';

  field.forEach((field) => (modal.innerHTML += field));

  parent.append(modal);

  Button(button, 'field-button', 'submit', modal);
  let submit = document.querySelector('.field-button');

  submit.addEventListener('click', async () => {
    let username = document.querySelector('#username').value;
    let room = document.querySelector('#room')?.value;

    // NB : WS Tests
    // const JSON = { category: 'createParty', username: username };
    // createPartyData(JSON);

    let selections = document.querySelectorAll('article');
    selections.forEach((section) => section.classList.add('out'));

    parent.addEventListener('transitionend', () => PlayersHub(room ?? 'RANDOM', username), { once: true });
  });
};

export default UserFieldsModal;

// NB : WS Tests
// const ws = new WebSocket('ws://localhost:3000');
// const createPartyData = (message) => {
//   ws.send(JSON.stringify(message));
// };
