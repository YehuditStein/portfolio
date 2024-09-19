

import Task from "./Task.js";

class TaskManager {
  constructor() {
    this.tasks = this.loadTasks(); // טוען את המשימות מ-Local Storage
  }

  addTask(description) {
    this.tasks.push(new Task(description));
    this.saveTasks(); // שמירת המשימות
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter((task) => task.id != id);
    this.saveTasks(); // שמירת המשימות
  }

  updateTaskDescription(id, newDesc) {
    let indexToUpdate = this.tasks.findIndex((task) => task.id == id);
    this.tasks[indexToUpdate].description = newDesc;
    this.saveTasks(); // שמירת המשימות
  }

  completeTask(id) {
    let indexToUpdate = this.tasks.findIndex((task) => task.id == id);
    this.tasks[indexToUpdate].completed = true;
    this.saveTasks(); // שמירת המשימות
  }

  saveTasks() {
    // שמירת המשימות ב-Local Storage כ-JSON
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  loadTasks() {
    // טעינת המשימות מ-Local Storage (אם יש)
    const tasksJson = localStorage.getItem("tasks");
    if (tasksJson) {
      const tasksArray = JSON.parse(tasksJson);
      // ממיר את האובייקטים מה-Local Storage לאובייקטי Task
      return tasksArray.map(taskData => Object.assign(new Task(), taskData));
    }
    return []; // אם אין נתונים ב-Local Storage
  }
}

export default TaskManager;
