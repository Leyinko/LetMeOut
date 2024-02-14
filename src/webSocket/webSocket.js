export const ws = new WebSocket('ws://localhost:3000');

function sendRequest(tag = null, name = null, lobbyCode = null, playerState = null, message = null) {
  let req = {
    tag: tag,
    name: name,
    lobbyCode: lobbyCode,
    playerState: playerState,
    message: message,
  };
  ws.send(JSON.stringify(req));
}

export default sendRequest;
