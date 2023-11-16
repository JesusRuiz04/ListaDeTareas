const tasks = loadTasksFromLocalStorage() || [];

function loadTasksFromLocalStorage() {
  const storedTasks = localStorage.getItem('tasks');
  return storedTasks ? JSON.parse(storedTasks) : [];
}

function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask(taskText) {
  tasks.push(taskText);
  saveTasksToLocalStorage();
  refreshTaskList();
  updateTaskCount(tasks.length);
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasksToLocalStorage();
  refreshTaskList();
  updateTaskCount(tasks.length);
}

function refreshTaskList() {
  const ul = document.querySelector('ul');
  ul.innerHTML = '';

  tasks.forEach((taskText, index) => {
    const div = document.createElement('div');
    div.innerHTML = `
      <div class="li-container">
        <li>
          <p>${taskText}</p>
          <button class="btn-delete" onclick="deleteTask(${index})">X</button>
        </li>
      </div>
    `;
    ul.appendChild(div);
  });


  const vacio = document.querySelector('.empty');
  if (tasks.length === 0) {
    vacio.style.display = 'block';
  } else {
    vacio.style.display = 'none';
  }
}

function updateTaskCount(count) {
  const taskCountSpan = document.querySelector('.task-count span:last-child');
  taskCountSpan.textContent = count;
}

document.addEventListener('DOMContentLoaded', function () {
  const addButton = document.querySelector('.btn-add');
  addButton.addEventListener('click', function (event) {
    event.preventDefault();
    const input = document.querySelector('input[type="text"]');
    const taskText = input.value;
    if (taskText.trim() !== '') {
      addTask(taskText);
      input.value = '';
    }
  });

  const ul = document.querySelector('ul');
  ul.addEventListener('click', function (event) {
    const target = event.target;
    if (target.classList.contains('btn-delete')) {
      const index = parseInt(target.getAttribute('data-index'));
      deleteTask(index);
    }
  });

  // Cargar tareas al iniciar la página
  refreshTaskList();
});
