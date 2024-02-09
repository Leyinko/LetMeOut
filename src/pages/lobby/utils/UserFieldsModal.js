import Button from '../../../components/atoms/button/Button';
import PlayersHub from './PlayersHub/PlayersHub';

const UserFieldsModal = (button, parent, ...field) => {
  let modal = document.createElement('div');
  modal.id = 'fields-modal';

  field.forEach((field) => (modal.innerHTML += field));

  parent.append(modal);

  Button(button, 'field-button', 'submit', modal);
  let submit = document.querySelector('.field-button');

  submit.addEventListener('click', () => {
    let inputs = document.querySelectorAll('input');
    let code = inputs.item(1) ? inputs.item(1).value : 'RANDOM';
    let username = inputs.item(0).value;

    // console.log(code, username);
    // const JSON = { category: 'createParty', username: username };

    // createPartyData(JSON);

    let sections = document.querySelectorAll('article');
    sections.forEach((section) => section.classList.add('out'));

    PlayersHub(code, username);

    inputs.forEach((input) => (input.value = ''));
  });
};

export default UserFieldsModal;

// const ws = new WebSocket('ws://localhost:3000');

// const createPartyData = (message) => {
//   ws.send(JSON.stringify(message));
// };
