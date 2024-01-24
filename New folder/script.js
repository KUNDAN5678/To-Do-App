document.addEventListener("DOMContentLoaded", function() {
    loadTasks();
});

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const task = { text: taskText, status: "pending" };
        saveTask(task);
        taskInput.value = "";
        loadTasks();
    }
}

function editTask(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    const updatedText = prompt("Edit task:", tasks[index].text);

    if (updatedText !== null) {
        tasks[index].text = updatedText;
        saveTasksToLocalStorage(tasks);
        loadTasks();
    }
}

function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.splice(index, 1);
    saveTasksToLocalStorage(tasks);
    loadTasks();
}

function toggleStatus(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks[index].status = tasks[index].status === "pending" ? "completed" : "pending";
    saveTasksToLocalStorage(tasks);
    loadTasks();
}

function saveTasksToLocalStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function saveTask(task) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    saveTasksToLocalStorage(tasks);
}

function loadTasks() {
    const taskContainer = document.getElementById("task-container");
    taskContainer.innerHTML = "";

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach((task, index) => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");
        if (task.status === "completed") {
            taskElement.classList.add("completed");
        }

        taskElement.innerHTML = `
            <span>${task.text}</span>
            <div>
                <button onclick="editTask(${index})">Edit</button>
                <button onclick="deleteTask(${index})">Delete</button>
                <button onclick="toggleStatus(${index})">${task.status === "completed" ? "Mark Pending" : "Mark Completed"}</button>
            </div>
        `;

        taskContainer.appendChild(taskElement);
    });
}
