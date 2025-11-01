const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

function addTask() {
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    createTaskElement(taskText, false);
    taskInput.value = '';
}

function createTaskElement(taskText, isCompleted = false) {
    const li = document.createElement('li');
    if (isCompleted) {
        li.classList.add('completed');
    }
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = isCompleted;
    
    const taskContent = document.createElement('div');
    taskContent.className = 'task-content';
    
    const taskSpan = document.createElement('span');
    taskSpan.className = 'task-text';
    taskSpan.textContent = taskText;
    
    const buttonGroup = document.createElement('div');
    buttonGroup.className = 'button-group';
    
    const editBtn = document.createElement('button');
    editBtn.className = 'edit-btn';
    editBtn.textContent = 'Edit';
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';
    
    buttonGroup.appendChild(editBtn);
    buttonGroup.appendChild(deleteBtn);
    taskContent.appendChild(taskSpan);
    
    li.appendChild(checkbox);
    li.appendChild(taskContent);
    li.appendChild(buttonGroup);
    taskList.appendChild(li);
    
    checkbox.addEventListener('change', function() {
        li.classList.toggle('completed');
        sortTasks();
    });
    
    editBtn.addEventListener('click', function() {
        editTask(li, taskSpan, taskContent, buttonGroup);
    });
    
    deleteBtn.addEventListener('click', function() {
        li.remove();
    });
}

function sortTasks() {
    const allTasks = Array.from(taskList.children);
    const uncompletedTasks = allTasks.filter(task => !task.classList.contains('completed'));
    const completedTasks = allTasks.filter(task => task.classList.contains('completed'));
    
    taskList.innerHTML = '';
    uncompletedTasks.forEach(task => taskList.appendChild(task));
    completedTasks.forEach(task => taskList.appendChild(task));
}

function editTask(li, taskSpan, taskContent, buttonGroup) {
    const currentText = taskSpan.textContent;
    
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'task-input';
    input.value = currentText;
    
    const editButtonGroup = document.createElement('div');
    editButtonGroup.className = 'button-group';
    
    const saveBtn = document.createElement('button');
    saveBtn.className = 'save-btn';
    saveBtn.textContent = 'Save';
    
    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'cancel-btn';
    cancelBtn.textContent = 'Cancel';
    
    taskContent.replaceChild(input, taskSpan);
    editButtonGroup.appendChild(saveBtn);
    editButtonGroup.appendChild(cancelBtn);
    li.replaceChild(editButtonGroup, buttonGroup);
    
    input.focus();
    input.select();
    
    saveBtn.addEventListener('click', function() {
        const newText = input.value.trim();
        if (newText === '') {
            alert('Task cannot be empty!');
            return;
        }
        taskSpan.textContent = newText;
        taskContent.replaceChild(taskSpan, input);
        li.replaceChild(buttonGroup, editButtonGroup);
    });
    
    cancelBtn.addEventListener('click', function() {
        taskContent.replaceChild(taskSpan, input);
        li.replaceChild(buttonGroup, editButtonGroup);
    });
    
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            saveBtn.click();
        }
    });
    
    input.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            cancelBtn.click();
        }
    });
}

addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});
