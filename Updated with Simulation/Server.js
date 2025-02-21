const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = new Server(server);


console.log('Socket.IO server on http://localhost:3000');

io.on('connection', (socket) => {
    console.log('A charger connected:', socket.id);

    socket.on('data', (data) => {
        console.log(`Received data from :`, data);

        socket.emit('charger-data-update', data);

        fs.appendFileSync('data.log', JSON.stringify(data) + '\n');
    });

    socket.on('disconnect', () => {
        console.log('A charger disconnected:', socket.id);
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:3000`);
});