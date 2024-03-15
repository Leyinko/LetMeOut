import { handleTime } from '../../../../../components/countdown/Countdown';
import { statsCollector } from '../../../../../data/localStorage/LS';
import sendRequest, { ws } from '../../../../../data/webSocket/webSocket';
import { nextStage, unlockTicket } from '../../../Progression/Progression';
import './Chat.css';

const Chat = () => {
  const chat = document.querySelector('#chat');
  const messages = document.querySelector('.messages');
  let self = document.querySelector('.id');

  !messages && ChatBox(document.querySelector('.id').textContent, chat);

  // WS
  ws.onmessage = function (event) {
    const current = JSON.parse(event.data);
    if (current.tag === 'chat') {
      chatMessage(current.name, current.message);
      // NEXT STAGE
      JSON.parse(localStorage.getItem('stats')).at(-1).sent >= 1 && nextStage('2');
      // Ticket Unlock
      current.ticket && current.name !== document.querySelector('.id').textContent && unlockTicket(current.ticket);
      // ! TEST
      // current.ticket && unlockTicket(current.ticket);
      // ! TEST
      // Final Game
      current.win && alert(`${current.message}`);
    } else if (current.tag === 'shareTime') {
      current.donor === self.textContent && handleTime(45, false);
      current.receiver === self.textContent && handleTime(45, true);
    }
  };
};

export const ChatBox = (username, parent) => {
  const messages = document.createElement('ul');
  messages.className = 'messages';

  const inputMessage = document.createElement('input');
  inputMessage.id = 'message-content';
  inputMessage.type = 'text';

  inputMessage.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.value && e.target.value.trim()) {
      sendRequest('chatMessage', username, null, null, inputMessage.value);
      inputMessage.value = '';
    }
  });

  parent.append(messages, inputMessage);
};

export function chatMessage(user, textContent) {
  let messages = document.querySelector('.messages');
  let localUser = document.querySelector('.id').textContent;

  let message = document.createElement('li');
  message.id = 'message';

  let sender = document.createElement('h4');
  sender.textContent = user.toUpperCase();

  let content = document.createElement('span');
  content.textContent = textContent;

  localUser === user.toUpperCase() && (message.className = 'self');

  // Stats
  statsCollector('messages', localUser === user.toUpperCase() ? 'sent' : 'received');

  message.append(sender, content);

  if (messages) {
    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
  }
}

export default Chat;
