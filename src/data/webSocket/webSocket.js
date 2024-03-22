import { handleTime } from '../../components/countdown/Countdown';
import { Win } from '../../pages/Result/Result';
import { chatMessage } from '../../pages/Room/Console/Actions/Chat/Chat';
import { accessSound, nextStage, unlockTicket } from '../../pages/Room/Progression/Progression';

// export const ws = new WebSocket('ws://5.250.185.179:3000');
export const ws = new WebSocket('ws://5.250.185.179:3000');

let listen = false;
export const ticketWSListen = () => (listen = true);

function sendRequest(
  tag = null,
  name = null,
  lobbyCode = null,
  playerState = null,
  message = null,
  from = null,
  to = null,
  signal = listen
) {
  let req = {
    tag: tag,
    name: name,
    lobbyCode: lobbyCode,
    playerState: playerState,
    message: message,
    donor: from,
    receiver: to,
    signal: signal,
  };

  ws.send(JSON.stringify(req));
}

export function inGameWebSocket() {
  let self = document.querySelector('.id');
  // WS
  ws.onmessage = function (event) {
    const current = JSON.parse(event.data);
    switch (current.tag) {
      case 'shareTime':
        current.donor === self.textContent && handleTime(45, false);
        current.receiver === self.textContent && handleTime(45, true);
        break;
      case 'checkExit':
        current.win ? Win() : accessSound('error') && handleTime(40, false);
        break;
      default:
        chatMessage(current.name, current.message);
        // NEXT STAGE
        JSON.parse(localStorage.getItem('stats')).at(-1).sent >= 1 && nextStage('2');
        // Ticket Unlock
        // current.ticket && current.name !== document.querySelector('.id').textContent && unlockTicket(current.ticket);
        // ! TEST
        current.ticket && unlockTicket(current.ticket);
      // ! TEST
    }
  };
}

export default sendRequest;
