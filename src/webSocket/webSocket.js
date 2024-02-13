const ws = new WebSocket('ws://localhost:3000');

class ReqBody {
  constructor({ tag = null, name = null, lobbyCode = null, playerState = null, message = null }) {
    this.tag = tag;
    this.name = name;
    this.lobbyCode = lobbyCode;
    this.playerState = playerState;
    this.message = message;
  }

  sendMessage(req) {
    ws.send(req);
  }
}

export default { ws, ReqBody };
