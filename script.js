



let todos = JSON.parse(localStorage.getItem('naveera_tasks')) || [];
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const editModal = new bootstrap.Modal(document.getElementById('editModal'));

// --- CREATE ---
function addTask() {
    const text = taskInput.value.trim();
    if (text === "") return;

    // 🔹 image field ADDED
    todos.push({ text: text, completed: false, image: "" });
    taskInput.value = "";
    saveAndRender();
}

// --- READ ---
function renderTasks() {
    taskList.innerHTML = "";
    todos.forEach((todo, index) => {
        const div = document.createElement('div');
        div.className = `task-item ${todo.completed ? 'completed' : ''}`;

        div.innerHTML = `
            <!-- IMAGE (CLICK TO UPLOAD) -->
            <img 
              src="${todo.image || 'https://via.placeholder.com/200'}"
              class="task-img"
              onclick="triggerImageUpload(${index})"
            />

            <input 
              type="file"
              accept="image/*"
              id="fileInput-${index}"
              style="display:none"
              onchange="handleImageUpload(event, ${index})"
            />

            <span class="task-text" onclick="toggleComplete(${index})">
              ${todo.text}
            </span>

            <div>
                <i class="fas fa-edit btn-icon" onclick="openEdit(${index})"></i>
                <i class="fas fa-trash btn-icon delete-btn" onclick="deleteTask(${index})"></i>
            </div>
        `;
        taskList.appendChild(div);
    });
}

// --- UPDATE (Status) ---
function toggleComplete(index) {
    todos[index].completed = !todos[index].completed;
    saveAndRender();
}

// --- UPDATE (Edit Content) ---
function openEdit(index) {
    document.getElementById('editTaskInput').value = todos[index].text;
    document.getElementById('editTaskIndex').value = index;
    editModal.show();
}

function saveEdit() {
    const index = document.getElementById('editTaskIndex').value;
    const newText = document.getElementById('editTaskInput').value;
    if (newText.trim() !== "") {
        todos[index].text = newText;
        editModal.hide();
        saveAndRender();
    }
}

// --- DELETE ---
function deleteTask(index) {
    const item = document.querySelectorAll('.task-item')[index];
    item.style.transform = "translateX(50px)";
    item.style.opacity = "0";
    setTimeout(() => {
        todos.splice(index, 1);
        saveAndRender();
    }, 300);
}

// 🔹 IMAGE UPLOAD FUNCTIONS (NEW)
function triggerImageUpload(index) {
    document.getElementById(`fileInput-${index}`).click();
}

function handleImageUpload(event, index) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        todos[index].image = e.target.result;
        saveAndRender();
    };
    reader.readAsDataURL(file);
}

// Helper to persist data
function saveAndRender() {
    localStorage.setItem('naveera_tasks', JSON.stringify(todos));
    renderTasks();
}

// Initial Render
renderTasks();

// Enter key support
taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
});
