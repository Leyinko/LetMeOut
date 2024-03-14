// export const ws = new WebSocket('ws://5.250.185.179:3000');
export const ws = new WebSocket('ws://localhost:3000');

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

export default sendRequest;
