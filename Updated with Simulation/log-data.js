const io = require('socket.io-client');

const fs = require('fs');
const socket = io('http://localhost:3000');

const logFile = 'data.log';
fs.writeFileSync(logFile, '');

const startTime = Date.now();
const duration = 2 * 60 * 1000;

const interval = setInterval(() => {
    if (Date.now() - startTime >= duration) {
        clearInterval(interval);
        socket.disconnect();
        console.log('Done logging data');
        return;
    }

    const data = {
        timestamp: new Date().toISOString(),
        voltage: Math.round((220 + Math.random() * 10) * 10000) / 10000,
        current: Math.round((10 + Math.random() * 2) * 10000) / 10000,
        power: Math.round((2200 + Math.random() * 100) * 10000) / 10000,
    };    console.log(`data : ${JSON.stringify(data)}`);

    socket.emit('data', data);
    // fs.appendFileSync(logFile, JSON.stringify(data) + '\n');

}, 5000); 
