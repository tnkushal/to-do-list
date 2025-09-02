const input = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

// Load saved tasks on page load
window.onload = loadTasks;

// Add task on button click
addBtn.addEventListener("click", addTask);

// Add task on pressing Enter
input.addEventListener("keypress", function(e) {
  if (e.key === "Enter") addTask();
});

function addTask() {
  const taskText = input.value.trim();
  if (taskText === "") return;

  createTaskElement(taskText);
  saveTask(taskText);

  input.value = "";
}

function createTaskElement(taskText, completed = false) {
  const li = document.createElement("li");
  li.textContent = taskText;

  if (completed) li.classList.add("completed");

  // Toggle complete on click
  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    updateStorage();
  });

  // Delete button
  const delBtn = document.createElement("button");
  delBtn.textContent = "X";
  delBtn.className = "delete-btn";
  delBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // prevent triggering complete toggle
    li.remove();
    updateStorage();
  });

  li.appendChild(delBtn);
  taskList.appendChild(li);
}

// Save task to localStorage
function saveTask(taskText) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: taskText, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => createTaskElement(task.text, task.completed));
}

// Update localStorage (for completed/deleted tasks)
function updateStorage() {
  const tasks = [];
  document.querySelectorAll("#task-list li").forEach(li => {
    tasks.push({
      text: li.firstChild.textContent,
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
