const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const ws = new WebSocket.Server({ noServer: true });

const PORT = process.env.PORT || 3000;

ws.on('connection', (socket) => {
    console.log('Cliente conectado');

    socket.on('message', message => {
        console.log(message, message.toString())
        ws.clients.forEach(client => {
            client.send(message.toString())
        })
    })
});

server.on('upgrade', (request, socket, head) => {
    ws.handleUpgrade(request, socket, head, (socket) => {
        ws.emit('connection', socket, request);
    });
});

server.listen(PORT, () => {
    console.log('Servidor levantado en el puerto:', PORT);
});