let todoArrayList = JSON.parse(localStorage.getItem('todoArrayList')) || [];
let lastTaskId = JSON.parse(localStorage.getItem('lastTaskId')) || 0;

// Add Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    
    loadTasksFromLocalStorage();
    callFunction();
    document.querySelector('#allTasksCount').classList.add('active');
    renderTasks('All');
});

document.querySelector('#allTasksCount').addEventListener('click', () => renderTasks('All'));
document.querySelector('#assignedTasksCount').addEventListener('click', () => renderTasks('Assigned'));
document.querySelector('#completedTasksCount').addEventListener('click', () => renderTasks('Completed'));

function add(event) {
    loadTasksFromLocalStorage();
    const inputField = document.querySelector('#inputfield');
    const taskName = inputField.value.trim();

    if (taskName === "") {
        displayMessage("Invalid input. Please enter a task.", "red");
        return;
    }

    const taskExists = todoArrayList.some(task => task.taskName.toLowerCase() === taskName.toLowerCase());

    if (taskExists) {
        displayMessage("Task already exists.", "red");
    } else {
        console.log("before",lastTaskId);
        lastTaskId++; 
        const taskObject = {
            taskId: lastTaskId,
            taskName: taskName,
            status: "incomplete"
        };
        console.log("after",lastTaskId);

        todoArrayList.push(taskObject);
        
        saveTasksToLocalStorage();
        renderTasks(getActiveCategory());

        inputField.value = "";
        displayMessage("Task added successfully!", "green");
    }
}

document.querySelector('#inputfield').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        add(event);
    }
});

function deleteElement(event) {
    const listItem = event.target.closest('li');
    const taskId = parseInt(listItem.dataset.id);
    const taskName = listItem.querySelector('.taskname').textContent;
    const confirmationModal = document.getElementById('confirmationModal');
    const modalText = document.querySelector('#modalText');
    const confirmButton = document.querySelector('#confirmButton');
    const cancelButton = document.querySelector('#cancelButton');

    modalText.textContent = `Are you sure you want to delete the task '${taskName}'?`;

    confirmationModal.style.display = 'flex';

    confirmButton.onclick = function () {
        todoArrayList = todoArrayList.filter(task => task.taskId !== taskId);
        saveTasksToLocalStorage();
        renderTasks(getActiveCategory());
        displayMessage(`Task '${taskName}' deleted successfully!`, "green");
        confirmationModal.style.display = 'none';
    };

    cancelButton.onclick = function () {
        confirmationModal.style.display = 'none';
    };
}

function editTask(event) {
    const inputField = document.querySelector('#inputfield');
    const addButton = document.querySelector('.addbutton');
    const clearButton = document.querySelector('.clearbutton');

    const listItem = event.target.closest('li');
    const taskId = parseInt(listItem.dataset.id);
    const task = todoArrayList.find(task => task.taskId === taskId);
    const taskNameDiv = listItem.querySelector('.taskname');
    const editButtonDiv = listItem.querySelector('.editbutton');
    inputField.disabled = addButton.disabled = clearButton.disabled = true;

    // Create and insert the edit input field
    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.value = task.taskName;
    editInput.classList.add('edit-input');
    taskNameDiv.textContent = '';
    taskNameDiv.appendChild(editInput);

    // Create and insert the save button
    const saveButton = document.createElement('button');
    saveButton.innerHTML = '<i class="fa-solid fa-floppy-disk fa-lg" style="color: #005eff;"></i>';
    saveButton.onclick = function () {
        const newTaskName = editInput.value.trim();

        if (newTaskName === "") {
            displayMessage("Invalid input. Please enter a valid task name.", "red");
        } else {
            const taskExists = todoArrayList.some(t => t.taskName === newTaskName && t.taskId !== taskId);

            if (taskExists) {
                displayMessage("Task name already exists.", "red");
            } else {
               
                task.taskName = newTaskName;
                callFunction(); 
                displayMessage("Task edited successfully!", "green");
            
            }
        }
        inputField.disabled = addButton.disabled = clearButton.disabled = false;
    };

    editButtonDiv.innerHTML = '';
    editButtonDiv.appendChild(saveButton);
    editInput.focus();
}


function renderTasks(category ) {
    const taskListContainer = document.querySelector('.TaskList');
    const taskList = document.querySelector('#taskList');
    const notaskimage = document.querySelector(".Notaskimage");

    taskList.innerHTML = "";

    const tasksToRender = filterTasks(category);

    if (tasksToRender.length === 0) {
        notaskimage.style.display = "flex";
        taskListContainer.style.display = "none";
        document.getElementById('clearAllButton').style.display = 'none'; 
    } else {
        notaskimage.style.display = "none";
        taskListContainer.style.display = "flex";
        taskList.style.flexDirection = "column";
        document.getElementById('clearAllButton').style.display = 'block'; 

        tasksToRender.forEach(task => {
            const listItem = document.createElement('li');
            listItem.dataset.id = task.taskId;
            const isCompleted = task.status === 'completed';
            
            listItem.innerHTML = `
                <div class="Listelements ${isCompleted ? 'completed' : ''}">
                    <div class="taskname ${isCompleted ? 'task-completed' : ''}">${task.taskName}</div>
                    <div class="done"><i class="fa-solid fa-circle-check fa-xl ${isCompleted ? 'completed-icon' : ''}" style="color: ${isCompleted ? 'gray' : '#3ca944'};" onclick="changeTaskStatus(event, ${task.taskId})"></i></div> 
                    <div class="editbutton"><button ${isCompleted ? 'disabled' : ''} onclick="editTask(event)" class="${isCompleted ? 'icon-completed' : ''}"><i class="fa-regular fa-pen-to-square fa-lg" style="color: #0e78c8;"></i></button></div>
                    <div class="Deletebutton"><button onclick="deleteElement(event)" class="${isCompleted ? 'icon-completed' : ''}"><i class="fa-solid fa-trash fa-lg" style="color: #f23131;"></i></button></div>
                </div>`;
            taskList.appendChild(listItem);
        });
    }

    updateCategoryHeadings();
}

function changeTaskStatus(event, taskId) {
    const task = todoArrayList.find(task => task.taskId === taskId);
    task.status = task.status === 'completed' ? 'incomplete' : 'completed';
    saveTasksToLocalStorage();
    renderTasks(getActiveCategory());
}

function filterTasks(category) {
    if (category === 'All') {
        return todoArrayList;
    } else if (category === 'Completed') {
        return todoArrayList.filter(task => task.status === 'completed');
    } else {
        return todoArrayList.filter(task => task.status === 'incomplete'); 
    }
}

function clearall() {
    const activeCategory = getActiveCategory();
    const tasksToClear = filterTasks(activeCategory);
    const confirmationModal = document.getElementById('confirmationModal');
    const modalText = document.querySelector('#modalText');
    const confirmButton = document.querySelector('#confirmButton');
    const cancelButton = document.querySelector('#cancelButton');

    if (tasksToClear.length === 0) {
        displayMessage(`No ${activeCategory} tasks to clear.`, "red");
        return;
    }
    if (activeCategory === 'All' || todoArrayList.length === 0) {
        lastTaskId = 0;
    }
    modalText.textContent = `Are you sure you want to clear ${activeCategory} tasks?`;

    confirmationModal.style.display = 'flex';

    confirmButton.onclick = function () {
        if (activeCategory === 'Completed') {
            todoArrayList = todoArrayList.filter(task => task.status !== 'completed');
        } else if (activeCategory === 'Assigned') {
            todoArrayList = todoArrayList.filter(task => task.status !== 'incomplete');
        } else {
            todoArrayList = [];
        }

        saveTasksToLocalStorage();
        renderTasks(getActiveCategory());
        displayMessage(`${activeCategory} tasks cleared successfully!`, "green");

        confirmationModal.style.display = 'none';
    };

    cancelButton.onclick = function () {
        confirmationModal.style.display = 'none';
    };
}

document.getElementById('clearAllButton').addEventListener('click', clearall);

function saveTasksToLocalStorage() {

    console.log("while saving",lastTaskId);
    localStorage.setItem('todoArrayList', JSON.stringify(todoArrayList));
    localStorage.setItem('lastTaskId', JSON.stringify(lastTaskId));
}
function displayMessage(message, color) {
    const errormsg = document.querySelector('.events');
    errormsg.textContent = message;
    errormsg.style.color = color;
    errormsg.style.visibility = "visible";

    setTimeout(() => {
        errormsg.style.visibility = "hidden";
    }, 2500);
}

function loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem('todoArrayList');
    const storedLastTaskId = localStorage.getItem('lastTaskId');
    console.log("loaded value",storedLastTaskId );
    if (storedTasks) {
       todoArrayList = JSON.parse(storedTasks);
    } else {
        todoArrayList = [];
    }
    if (storedLastTaskId) {
        lastTaskId = JSON.parse(storedLastTaskId);
    } else {
      lastTaskId = 0;
    }
}

function updateCategoryHeadings() {
    const allTasksCount = document.querySelector('#allTasksCount');
    const assignedTasksCount = document.querySelector('#assignedTasksCount');
    const completedTasksCount = document.querySelector('#completedTasksCount');
    allTasksCount.textContent = `All (${todoArrayList.length})`;
    assignedTasksCount.textContent = `Assigned (${todoArrayList.filter(task => task.status === 'incomplete').length})`; 
    completedTasksCount.textContent = `Completed (${todoArrayList.filter(task => task.status === 'completed').length})`;
}

function callFunction() {
    saveTasksToLocalStorage();
    renderTasks(getActiveCategory());
    const activeCategory = getActiveCategory();
    const tasksInCategory = filterTasks(activeCategory);
    document.getElementById('clearAllButton').style.display = tasksInCategory.length > 0 ? 'block' : 'none';
}

[document.querySelector('#allTasksCount'), document.querySelector('#assignedTasksCount'), document.querySelector('#completedTasksCount')].forEach(button => {
    button.addEventListener('click', () => {
            [document.querySelector('#allTasksCount'), document.querySelector('#assignedTasksCount'), document.querySelector('#completedTasksCount')].forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        callFunction(); 
    });
});

function getActiveCategory() {
    if (document.querySelector('#allTasksCount').classList.contains('active')) return 'All';
    if (document.querySelector('#assignedTasksCount').classList.contains('active')) return 'Assigned';
    if (document.querySelector('#completedTasksCount').classList.contains('active')) return 'Completed';
}

module.exports = {
    loadTasksFromLocalStorage,
    callFunction, add,
    getActiveCategory,
    deleteElement, editTask,
    renderTasks,
    changeTaskStatus, filterTasks, clearall, displayMessage, saveTasksToLocalStorage, updateCategoryHeadings
};
