const express = require('express');
const http = require('http');

const { Server } = require('socket.io');

const path = require('path');

const app = express();

const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

let tasks = [];

// Handle Socket.IO connections
io.on('connection', (socket) => {
    console.log('connected Sucss');

    // Send new client
    socket.emit('task-list', tasks);

    // Handle new task events
    socket.on('add-task', (task) => {
        tasks.push({ id: Date.now(), text: task, completed: false });
        io.emit('task-list', tasks); 
    });

    socket.on('complete-task', (taskId) => {
        tasks = tasks.map((task) =>
            task.id === taskId ? { ...task, completed: true } : task
        );
        io.emit('task-list', tasks); // Broadcast updated task list to all clients
    });

    // Handle errror
    socket.on('error', (error) => {
        console.error('Socket error:', error);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('disconnected');
    });


});

server.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
});