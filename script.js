const buttonCreateTask = document.querySelector('#criar-tarefa');
const idTaskList = '#lista-tarefas';

function createTask() {
  const input = document.querySelector('#texto-tarefa');
  const task = document.createElement('li');
  const taskList = document.querySelector(idTaskList);
  task.innerText = input.value;
  task.className = 'tarefas';
  taskList.appendChild(task);
  input.value = '';
}
buttonCreateTask.addEventListener('click', createTask);

const tasks = document.querySelector(idTaskList).children;

function selectTask({ target }) {
  for (let i = 0; i < tasks.length; i += 1) {
    if (tasks[i] === target) {
      target.classList.add('selected');
    } else if (tasks[i] !== target && target.classList.contains('tarefas')) {
      tasks[i].classList.remove('selected');
    }
  }
}
document.addEventListener('click', selectTask);

function finishTask({ target }) {
  for (let i = 0; i < tasks.length; i += 1) {
    if (tasks[i] === target) {
      target.classList.toggle('completed');
      target.classList.remove('selected');
    }
  }
}
document.addEventListener('dblclick', finishTask);

const clearAllTasksButton = document.querySelector('#apaga-tudo');
function clearAllTasks() {
  const taskList = document.querySelector(idTaskList);
  for (let i = tasks.length; i >= 0; i -= 1) {
    if (tasks.length) {
      taskList.removeChild(taskList.firstChild);
    }
  }
  localStorage.removeItem('taskList');
}
clearAllTasksButton.addEventListener('click', clearAllTasks);

const clearFinishedTasksButton = document.querySelector('#remover-finalizados');
function clearFinishedTasks() {
  const finishedTasks = document.querySelectorAll('.completed');
  for (let i = 0; i < finishedTasks.length; i += 1) {
    finishedTasks[i].remove();
  }
}
clearFinishedTasksButton.addEventListener('click', clearFinishedTasks);

const saveListButton = document.querySelector('#salvar-tarefas');

function saveList() {
  const tasksToBeSaved = document.querySelectorAll('.tarefas');
  const savedTasks = [];
  tasksToBeSaved.forEach((task) => savedTasks.push({ val1: task.innerHTML, val2: task.className }));
  localStorage.setItem('taskList', JSON.stringify(savedTasks));
}
saveListButton.addEventListener('click', saveList);

function setInititalTasks() {
  const localStorageTasks = JSON.parse(localStorage.getItem('taskList')) || [];
  const taskList = document.querySelector(idTaskList);
  return localStorageTasks.map((task) => {
    const newTask = document.createElement('li');
    newTask.innerHTML = task.val1;
    newTask.className = task.val2;
    return taskList.appendChild(newTask);
  });
}

const moveTaskUpButton = document.querySelector('#mover-cima');

function moveTaskUp() {
  const selectedTask = document.querySelector('.selected')
  || document.querySelectorAll('.tarefas')[0];
  const taskUp = selectedTask.previousSibling;
  if (taskUp) {
    const selectedHTML = selectedTask.innerHTML;
    const taskUpHTML = taskUp.innerHTML;
    taskUp.innerHTML = selectedHTML;
    selectedTask.innerHTML = taskUpHTML;
    selectedTask.classList.remove('selected');
    taskUp.classList.add('selected');
    if (selectedTask.classList.contains('completed')) {
      selectedTask.classList.remove('completed');
      taskUp.classList.add('completed');
    }
  }
}
moveTaskUpButton.addEventListener('click', moveTaskUp);

const moveTaskDownButton = document.querySelector('#mover-baixo');

function moveTaskDown() {
  const selectedTask = document.querySelector('.selected')
  || document.querySelectorAll('.tarefas')[0];
  const taskDown = selectedTask.nextSibling;
  if (taskDown) {
    const selectedHTML = selectedTask.innerHTML;
    const taskDownHTML = taskDown.innerHTML;
    taskDown.innerHTML = selectedHTML;
    selectedTask.innerHTML = taskDownHTML;
    selectedTask.classList.remove('selected');
    taskDown.classList.add('selected');
    if (selectedTask.classList.contains('completed')) {
      selectedTask.classList.remove('completed');
      taskDown.classList.add('completed');
    }
  }
}
moveTaskDownButton.addEventListener('click', moveTaskDown);

const deleteButton = document.querySelector('#remover-selecionado');

function removeSelected() {
  const selectedTask = document.querySelector('.selected');
  selectedTask.remove();
}
deleteButton.addEventListener('click', removeSelected);

document.onload = setInititalTasks();
