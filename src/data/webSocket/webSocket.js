import { accessSound, playSound } from '../../components/audio/Audio';
import { handleTime } from '../../components/countdown/Countdown';
import Release, { worldwideRelease } from '../../pages/Room/Console/Actions/Diskette/Release/Release';
import { GameResult, gameOverAnimation } from '../../pages/Result/Result';
import { chatMessage } from '../../pages/Room/Console/Actions/Chat/Chat';
import { nextStage, unlockTicket, waitingPlayersForReboot } from '../../pages/Room/Progression/Progression';
import { sendScore } from '../fetch';
import { setAlternativeTrue } from '../localStorage/LS';

// export const ws = new WebSocket('ws://localhost:3000');
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
  let local = ls.players.find((player) => player.id == self.textContent);

  ws.onmessage = function (event) {
    const current = JSON.parse(event.data);
    switch (current.tag) {
      case 'shareTime':
        current.donor === self.textContent && handleTime(45, false);
        current.receiver === self.textContent && handleTime(45, true);
        break;
      case 'endGame':
        // NB : NORMAL ENDING
        if (current.access) {
          let team = current.access.map((player) => player.access);
          let states = team.filter((status) => status === true);
          let confirmation = document.querySelector('#confirmation-out');

          // Waiting Room
          current.name === local.name && states.length <= 2
            ? waitingPlayersForReboot(states)
            : confirmation && (confirmation.textContent = String(states.length));
          // Send Team Score
          team.every(Boolean) && ls.players.at(-1).id == self.textContent && sendScore();
          // Win
          team.every(Boolean) && GameResult(true);
          return;
        }

        // NB : ALTERNATIVE ENDING
        current.alternative && setAlternativeTrue();
        if (current.alternative && current.name == ls.username) {
          Release();
        } else if (current.alternative && current.name !== ls.username) {
          worldwideRelease();
          return;
        }

        // NB : WRONG CODE
        current.name == ls.username &&
          current.message == 'You are shit' &&
          accessSound('error') &&
          handleTime(40, false);

        break;
      case 'lose':
        gameOverAnimation();
        break;
      default:
        chatMessage(current.name, current.message);
        // Next Stage
        JSON.parse(localStorage.getItem('stats')).at(-1).sent >= 1 && nextStage('2');
        // Ticket Unlock
        current.ticket && current.name != self.textContent && unlockTicket(current.ticket);
      // // ! TEST
      //   current.ticket && unlockTicket(current.ticket);
      // // ! TEST
    }
  };
}

export default sendRequest;
