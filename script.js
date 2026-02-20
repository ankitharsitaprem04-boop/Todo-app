const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

addTaskBtn.addEventListener("click", addTask);

function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  const li = document.createElement("li");
  li.textContent = taskText;

  // Mark complete on click
  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
  });

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.className = "delete-btn";

  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // prevent toggling complete
    li.remove();
    saveTasks();
  });

  li.appendChild(deleteBtn);
  taskList.appendChild(li);

  taskInput.value = "";
  saveTasks();
}

// Save tasks to localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll("li").forEach(li => {
    tasks.push({
      text: li.firstChild.textContent,
      completed: li.classList.contains("completed")
    });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  savedTasks.forEach(task => {
    const li = document.createElement("li");
    li.textContent = task.text;

    if (task.completed) {
      li.classList.add("completed");
    }

    li.addEventListener("click", () => {
      li.classList.toggle("completed");
      saveTasks();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.className = "delete-btn";

    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      li.remove();
      saveTasks();
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

// Load existing tasks on page load
loadTasks();
