import TaskManager from "./classes/TaskManager.js";

let manager = new TaskManager();


window.addNewTask = function addNewTask() {
  let description = document.getElementById("description").value;
  if(description==""){
    alert("Add descraption");
  }
  else{
  manager.addTask(description);}
  showTasks();
  document.getElementById("description").value=""
};

// function showTasks() {
//   document.getElementById("activeTasks").innerHTML = "";
//   document.getElementById("completedTasks").innerHTML = "";
//   for (let task of manager.tasks) {
//     if (task.completed) {
//       document.getElementById(
//         "completedTasks"
//       ).innerHTML += `<div><li class='list-group-item d-inline-block w-50 text-decoration-line-through'> ${task.description}</li> <button class='btn btn-success me-1' disabled> <i class="fa-solid fa-check"></i> </button><button class='btn btn-primary me-1' disabled> <i class="text-light fa-sharp fa-solid fa-pencil"></i> </button><button class='btn btn-danger me-1' disabled> <i class="fa-solid fa-trash"></i> </button> </div>
//     `;
//     } else {
//       document.getElementById(
//         "activeTasks"
//       ).innerHTML += `<div><li class='list-group-item d-inline-block w-50'> ${task.description}</li> <button class='btn btn-success me-1' onclick='completeTask(${task.id})'> <i class="fa-solid fa-check"></i> </button><button class='btn btn-primary me-1' onclick='updateTask(${task.id},"${task.description}")'> <i class="text-light fa-sharp fa-solid fa-pencil"></i> </button><button class='btn btn-danger me-1'> <i class="fa-solid fa-trash" onclick='deleteTask(${task.id})'></i> </button> </div>
//     `;
//     }
//   }
// }

// showTasks();

window.completeTask = function completeTask(id) {
  manager.completeTask(id);
  showTasks();
};

window.updateTask = function updateTask(id, oldDesc) {
  let newDesc = prompt("Enter new description:", oldDesc);
  if (newDesc !== null && newDesc !== "") {
    manager.updateTaskDescription(id, newDesc);
    showTasks();
  } else alert("Invalid input");
};

window.deleteTask = function deleteTask(id) {
  if (confirm("Are you sure?")) {
    manager.deleteTask(id);
    showTasks();
  }
};

function showTasks() {
  const activeTasksList = document.getElementById("activeTasks");
  const completedTasksList = document.getElementById("completedTasks");
  const activeHeader = document.getElementById("activeHeader");
  const completedHeader = document.getElementById("completedHeader");

  // Clear the task lists
  activeTasksList.innerHTML = "";
  completedTasksList.innerHTML = "";

  let hasActiveTasks = false;
  let hasCompletedTasks = false;

  // Loop through the tasks and add them to the appropriate section
  for (let task of manager.tasks) {
    if (task.completed) {
      completedTasksList.innerHTML += `
        <div>
          <li class='list-group-item d-inline-block w-50 text-decoration-line-through'>
            ${task.description}
          </li>
          <button class='btn btn-success me-1' disabled><i class="fa-solid fa-check"></i></button>
          <button class='btn btn-primary me-1' disabled><i class="text-light fa-sharp fa-solid fa-pencil"></i></button>
          <button class='btn btn-danger me-1' disabled><i class="fa-solid fa-trash"></i></button>
        </div>
      `;
      hasCompletedTasks = true;
    } else {
      activeTasksList.innerHTML += `
        <div>
          <li class='list-group-item d-inline-block w-50'>${task.description}</li>
          <button class='btn btn-success me-1' onclick='completeTask(${task.id})'><i class="fa-solid fa-check"></i></button>
          <button class='btn btn-primary me-1' onclick='updateTask(${task.id}, "${task.description}")'><i class="text-light fa-sharp fa-solid fa-pencil"></i></button>
          <button class='btn btn-danger me-1' onclick='deleteTask(${task.id})'><i class="fa-solid fa-trash"></i></button>
        </div>
      `;
      hasActiveTasks = true;
    }
  }

  // Show or hide headers based on task availability
  activeHeader.style.display = hasActiveTasks ? "block" : "none";
  completedHeader.style.display = hasCompletedTasks ? "block" : "none";
}

showTasks();
