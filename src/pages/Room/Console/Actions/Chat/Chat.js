import { statsCollector } from '../../../../../data/localStorage/LS';
import sendRequest from '../../../../../data/webSocket/webSocket';
import './Chat.css';

const Chat = () => {
  const chat = document.querySelector('#chat');
  const messages = document.querySelector('.messages');

  !messages && ChatBox(document.querySelector('.id').textContent, chat);
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
