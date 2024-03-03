import sendRequest from '../../../../webSocket/webSocket';
import './Chat.css';

const ChatBox = (username, parent) => {
  let container = document.querySelector('#chat-container');
  if (!container) {
    const chatContainer = document.createElement('div');
    chatContainer.id = 'chat-container';

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

    chatContainer.append(messages, inputMessage);
    parent.appendChild(chatContainer);

    chatContainer.classList.toggle('open');
  } else {
    container.classList.toggle('open');
  }
};

export function chatMessage(user, textContent) {
  let messages = document.querySelector('.messages');

  let localUser = document.querySelector('.player')
    ? document.querySelector('.player').textContent
    : document.querySelector('.id').textContent;

  let message = document.createElement('li');
  message.id = 'message';

  let sender = document.createElement('h4');
  sender.textContent = user.toUpperCase();

  let content = document.createElement('span');
  content.textContent = textContent;

  localUser === user.toUpperCase() && (message.className = 'self');

  message.append(sender, content);

  if (messages) {
    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
  }
}

export default ChatBox;
