import { accessSound } from '../../components/audio/Audio';
import { handleTime } from '../../components/countdown/Countdown';
import Release from '../../components/release/release';
import { Lose, Win } from '../../pages/Result/Result';
import { chatMessage } from '../../pages/Room/Console/Actions/Chat/Chat';
import { nextStage, unlockTicket } from '../../pages/Room/Progression/Progression';

export const ws = new WebSocket('ws://localhost:3000');
// export const ws = new WebSocket('ws://5.250.185.179:3000');

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
  signal = listen,
  reboot = false
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
    reboot: reboot,
  };

  ws.send(JSON.stringify(req));
}

export function inGameWebSocket() {
  let self = document.querySelector('.id');
  let ls = JSON.parse(localStorage.getItem('data'));
  // WS
  ws.onmessage = function (event) {
    const current = JSON.parse(event.data);
    switch (current.tag) {
      case 'shareTime':
        current.donor === self.textContent && handleTime(45, false);
        current.receiver === self.textContent && handleTime(45, true);
        break;
      case 'endGame':
        // Reboot Ending
        current.win && Win();
        // Alternative
        current.alternative && current.name == ls.username ? Release() : Win();
        // Error
        !current.win &&
          !current.alternative &&
          current.name == ls.username &&
          accessSound('error') &&
          handleTime(40, false);
        break;
      case 'lose':
        Lose();
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
