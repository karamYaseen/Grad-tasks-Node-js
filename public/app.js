const socket = io();

const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// submission
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const task = taskInput.value.trim();
    if (task) {
        socket.emit('add-task', task); 
        taskInput.value = '';
    }
});

// updates
socket.on('task-list', (tasks) => {
    taskList.innerHTML = ''; 

    tasks.forEach((task) => {
        const li = document.createElement('li');
        li.textContent = task.text;
        li.className = task.completed ? 'completed' : '';

        // mark as completed
        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.addEventListener('click', () => {
            socket.emit('complete-task', task.id); // Send the task ID to the server
        });

        li.appendChild(completeButton);
        taskList.appendChild(li);
    });
});