document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const pendingList = document.getElementById('pendingList');
    const completedList = document.getElementById('completedList');
    
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    // Initialize the app
    renderTasks();
    
    // Add task event
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;
        
        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false,
            createdAt: new Date().toISOString(),
            completedAt: null
        };
        
        tasks.push(newTask);
        saveTasks();
        renderTasks();
        taskInput.value = '';
    }
    
    function renderTasks() {
        pendingList.innerHTML = '';
        completedList.innerHTML = '';
        
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.dataset.id = task.id;
            
            const taskContent = document.createElement('div');
            taskContent.className = 'task-content';
            
            const taskText = document.createElement('span');
            taskText.className = 'task-text';
            taskText.textContent = task.text;
            if (task.completed) {
                taskText.classList.add('completed');
            }
            
            const taskTime = document.createElement('div');
            taskTime.className = 'task-time';
            taskTime.textContent = `Added: ${formatDate(task.createdAt)}`;
            if (task.completed && task.completedAt) {
                taskTime.textContent += ` | Completed: ${formatDate(task.completedAt)}`;
            }
            
            const taskActions = document.createElement('div');
            taskActions.className = 'task-actions';
            
            if (!task.completed) {
                const completeBtn = document.createElement('button');
                completeBtn.className = 'complete-btn';
                completeBtn.innerHTML = '<i class="fas fa-check"></i>';
                completeBtn.title = 'Complete';
                completeBtn.addEventListener('click', () => completeTask(task.id));
                taskActions.appendChild(completeBtn);
            }
            
            const editBtn = document.createElement('button');
            editBtn.className = 'edit-btn';
            editBtn.innerHTML = '<i class="fas fa-edit"></i>';
            editBtn.title = 'Edit';
            editBtn.addEventListener('click', () => editTask(task.id));
            taskActions.appendChild(editBtn);
            
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
            deleteBtn.title = 'Delete';
            deleteBtn.addEventListener('click', () => deleteTask(task.id));
            taskActions.appendChild(deleteBtn);
            
            taskContent.appendChild(taskText);
            taskContent.appendChild(taskTime);
            
            li.appendChild(taskContent);
            li.appendChild(taskActions);
            
            if (task.completed) {
                completedList.appendChild(li);
            } else {
                pendingList.appendChild(li);
            }
        });
    }
    
    function completeTask(id) {
        const taskIndex = tasks.findIndex(task => task.id === id);
        if (taskIndex !== -1) {
            tasks[taskIndex].completed = true;
            tasks[taskIndex].completedAt = new Date().toISOString();
            saveTasks();
            renderTasks();
        }
    }
    
    function editTask(id) {
        const task = tasks.find(task => task.id === id);
        if (!task) return;
        
        const newText = prompt('Edit your task:', task.text);
        if (newText !== null && newText.trim() !== '') {
            task.text = newText.trim();
            saveTasks();
            renderTasks();
        }
    }
    
    function deleteTask(id) {
        if (confirm('Are you sure you want to delete this task?')) {
            tasks = tasks.filter(task => task.id !== id);
            saveTasks();
            renderTasks();
        }
    }
    
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    function formatDate(isoString) {
        const date = new Date(isoString);
        return date.toLocaleString();
    }
});