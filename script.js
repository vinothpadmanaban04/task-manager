document.getElementById('add-task-btn').addEventListener('click', addTask);

function addTask() {
    const taskName = document.getElementById('task-name').value;
    const taskDeadline = document.getElementById('task-deadline').value;
    const taskTime = document.getElementById('task-time').value;
    const taskPriority = document.getElementById('task-priority').value;

    if (!taskName || !taskDeadline || !taskTime) {
        alert('Please fill out all fields.');
        return;
    }

    const taskDateTime = new Date(`${taskDeadline}T${taskTime}`);

    const taskItem = document.createElement('li');
    taskItem.innerHTML = `
        <span><strong>Task:</strong> ${taskName} <br>
        <strong>Deadline:</strong> ${taskDeadline} ${taskTime} <br>
        <strong>Priority:</strong> <span class="priority ${taskPriority.toLowerCase()}">${taskPriority}</span></span>
        <button onclick="editTask(this)">Edit</button>
        <button onclick="completeTask(this)">Complete</button>
        <button onclick="deleteTask(this)">Delete</button>
    `;

    document.getElementById('task-items').appendChild(taskItem);

    // Set alarm for task deadline
    setTaskAlarm(taskDateTime, taskName);

    // Clear the input fields
    document.getElementById('task-name').value = '';
    document.getElementById('task-deadline').value = '';
    document.getElementById('task-time').value = '';
    document.getElementById('task-priority').value = 'Low';
}

function deleteTask(button) {
    button.parentElement.remove();
}

function completeTask(button) {
    const taskItem = button.parentElement;
    taskItem.classList.toggle('completed');
    button.innerText = taskItem.classList.contains('completed') ? 'Undo' : 'Complete';
}

function editTask(button) {
    const taskItem = button.parentElement;
    const taskDetails = taskItem.querySelector('span').innerText.split('\n');
    
    const taskName = taskDetails[0].replace('Task: ', '');
    const taskDeadline = taskDetails[1].replace('Deadline: ', '').split(' ')[0];
    const taskTime = taskDetails[1].replace('Deadline: ', '').split(' ')[1];
    const taskPriority = taskDetails[2].replace('Priority: ', '');

    document.getElementById('task-name').value = taskName;
    document.getElementById('task-deadline').value = taskDeadline;
    document.getElementById('task-time').value = taskTime;
    document.getElementById('task-priority').value = taskPriority;

    taskItem.remove();
}

// Alarm function to trigger when deadline reaches
function setTaskAlarm(deadline, taskName) {
    const now = new Date();
    const timeUntilAlarm = deadline.getTime() - now.getTime();

    if (timeUntilAlarm > 0) {
        setTimeout(() => {
            alert(`Task "${taskName}" has reached its deadline!`);
            playAlarmSound();
        }, timeUntilAlarm);
    } else {
        alert('Deadline is in the past. Please set a future time.');
    }
}

// Function to play an alarm sound
function playAlarmSound() {
    const audio = new Audio('alarm.mp3');
    audio.play();
}
