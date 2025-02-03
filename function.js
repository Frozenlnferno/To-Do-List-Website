
document.addEventListener("DOMContentLoaded", loadTasks);

function openModal() {
    document.getElementById('taskModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('taskModal').style.display = 'none';
}

function saveTask() {
    const name = document.getElementById('taskName').value.trim();
    const description = document.getElementById('taskDescription').value.trim();
    const deadline = document.getElementById('taskDeadline').value;
    if (name === '') return;
    
    const li = document.createElement('li');
    li.innerHTML = `<input type="checkbox" onclick="toggleComplete(this)">
                    <span class="task-text"><strong>${name}</strong><br>${description}<br>Deadline: ${deadline}</span>
                    <input type="text" class="edit-input">
                    <button onclick="editTask(this)">Edit</button>
                    <button onclick="removeTask(this)">Delete</button>`;
    
    document.getElementById('taskList').appendChild(li);
    saveToLocalStorage();
    closeModal();
}

function removeTask(button) {
    button.parentElement.remove();
    saveToLocalStorage();
}

function editTask(button) {
    const li = button.parentElement;
    const textSpan = li.querySelector('.task-text');
    const inputField = li.querySelector('.edit-input');
    
    if (inputField.style.display === 'none' || inputField.style.display === '') {
        inputField.value = textSpan.innerText;
        textSpan.style.display = 'none';
        inputField.style.display = 'inline-block';
        inputField.focus();
        button.textContent = 'Save';
    } else {
        textSpan.innerHTML = inputField.value;
        textSpan.style.display = 'inline';
        inputField.style.display = 'none';
        button.textContent = 'Edit';
        saveToLocalStorage();
    }
}

function toggleComplete(checkbox) {
    const li = checkbox.parentElement;
    if (checkbox.checked) {
        document.getElementById('completedList').appendChild(li);
    } else {
        document.getElementById('taskList').appendChild(li);
    }
    saveToLocalStorage();
}

function saveToLocalStorage() {
    const tasks = {
        current: document.getElementById('taskList').innerHTML,
        completed: document.getElementById('completedList').innerHTML
    };
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        document.getElementById('taskList').innerHTML = tasks.current;
        document.getElementById('completedList').innerHTML = tasks.completed;
        
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.onclick = () => toggleComplete(checkbox);
        });
    }
}
