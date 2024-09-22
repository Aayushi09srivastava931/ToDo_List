document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.querySelector('.todo-input');
    const todoButton = document.querySelector('.todo-btn');
    const todoList = document.querySelector('.todo-list');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Add Task
    todoButton.addEventListener('click', addTodo);

    // Complete / Delete Task
    todoList.addEventListener('click', handleTask);

    // Filter Tasks
    filterButtons.forEach(btn => btn.addEventListener('click', filterTasks));

    function addTodo() {
        const task = todoInput.value.trim();
        if (task) {
            const todoDiv = document.createElement('div');
            todoDiv.classList.add('todo-item');

            const todoText = document.createElement('span');
            todoText.textContent = task;
            todoDiv.appendChild(todoText);

            const completeBtn = document.createElement('button');
            completeBtn.innerHTML = '&#10003;';
            completeBtn.classList.add('complete-btn');
            todoDiv.appendChild(completeBtn);

            const deleteBtn = document.createElement('button');
            deleteBtn.innerHTML = '&#10005;';
            deleteBtn.classList.add('delete-btn');
            todoDiv.appendChild(deleteBtn);

            todoList.appendChild(todoDiv);
            todoInput.value = '';
        }
    }

    function handleTask(e) {
        const item = e.target;
        const todo = item.parentElement;

        // Mark as completed
        if (item.classList.contains('complete-btn')) {
            todo.classList.toggle('completed');
        }

        // Delete task
        if (item.classList.contains('delete-btn')) {
            todo.remove();
        }
    }

    function filterTasks(e) {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        const filter = e.target.getAttribute('data-filter');
        const tasks = todoList.childNodes;

        tasks.forEach(task => {
            switch (filter) {
                case 'all':
                    task.style.display = 'flex';
                    break;
                case 'completed':
                    task.style.display = task.classList.contains('completed') ? 'flex' : 'none';
                    break;
                case 'uncompleted':
                    task.style.display = task.classList.contains('completed') ? 'none' : 'flex';
                    break;
            }
        });
    }
});
