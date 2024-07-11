let todoArrayList = []; // create arraylist to push todo tasks

//Query Selectors
const inputField = document.querySelector('#inputfield');
const taskList = document.querySelector('#taskList');
const errormsg = document.querySelector('.events');
const allTasksCount = document.querySelector('#allTasksCount');
const assignedTasksCount = document.querySelector('#assignedTasksCount');
const completedTasksCount = document.querySelector('#completedTasksCount');

document.addEventListener('DOMContentLoaded', () => {
    loadTasksFromLocalStorage();
    callFunction();
    setInitialActiveButton();
});

allTasksCount.addEventListener('click', () => renderTasks('All'));
assignedTasksCount.addEventListener('click', () => renderTasks('Assigned'));
completedTasksCount.addEventListener('click', () => renderTasks('Completed'));



// function to add list elements

function add(event) {
    event.preventDefault();

    const taskName = inputField.value.trim();
    if (taskName !== "") {
        const taskObject = {
            taskId: todoArrayList.length + 1,
            taskName: taskName,
            status: "incomplete"
        };

        todoArrayList.push(taskObject);
        callFunction();

        inputField.value = "";
        displayMessage("Task added successfully!", "green");
    } else {
        displayMessage("Invalid input. Please enter a task.", "red");
    }
}
// function to delete task list
function deleteElement(event) {
    const taskId = parseInt(event.target.closest('li').dataset.id);

    const newTodoArrayList = [];
    for (let task of todoArrayList) {
        if (task.taskId !== taskId) {
            newTodoArrayList.push(task);
        }
    }
    todoArrayList = newTodoArrayList;

    callFunction();
    displayMessage("Task deleted successfully!", "green");
}

// function to edit task list
function editTask(event) {
    const listItem = event.target.closest('li');
    const taskId = parseInt(listItem.dataset.id);
    const task = todoArrayList.find(task => task.taskId === taskId);
    const taskNameDiv = listItem.querySelector('.taskname');
    const editButtonDiv = listItem.querySelector('.editbutton');


    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.value = task.taskName;
    editInput.classList.add('edit-input');
    taskNameDiv.textContent = '';
    taskNameDiv.appendChild(editInput);

// create save button
    const saveButton = document.createElement('button');
    saveButton.innerHTML = '<i class="fa-sharp fa-solid fa-floppy-disk fa-sm" style="color: #3b2970;"></i>';
    saveButton.onclick = function () {
        const newTaskName = editInput.value.trim();
        if (newTaskName !== "") {
            task.taskName = newTaskName;
            callFunction();
            displayMessage("Task edited successfully!", "green");
        } else {
            displayMessage("Invalid input. Please enter a valid task name.", "red");
        }
    };

    editButtonDiv.innerHTML = '';
    editButtonDiv.appendChild(saveButton);

    editInput.focus();
}


//function to render task;
function renderTasks(category = 'All') {
    taskList.innerHTML = "";

    const tasksToRender = filterTasks(category);

    if (tasksToRender.length === 0) {
        displayNoTasksImage();
    } else {
        tasksToRender.forEach(task => {
            const listItem = document.createElement('li');
            listItem.dataset.id = task.taskId;
            const isCompletedInAll = (category === 'All' && task.status === 'completed');
            listItem.innerHTML = `
                <div class="Listelements ${isCompletedInAll ? 'completed' : ''}">
                    <div class="taskCheckbox"><input type="checkbox" class="taskCheckbox" ${task.status === 'completed' ? 'checked' : ''} onchange="changeTaskStatus(${task.taskId})"></div>
                    <div class="taskname ${isCompletedInAll ? 'task-completed' : ''}">${task.taskName}</div>
                    <div class="editbutton"><button onclick="editTask(event)" class="${isCompletedInAll ? 'icon-completed' : ''}"><i class="fa-regular fa-pen-to-square fa-lg"></i></button></div>
                    <div class="Deletebutton"><button onclick="deleteElement(event)" class="${isCompletedInAll ? 'icon-completed' : ''}"><i class="fa-solid fa-trash fa-lg"></i></button></div>
                </div>`;
            taskList.appendChild(listItem);
        });
    }

    updateCategoryHeadings();
}

function changeTaskStatus(taskId) {
    const task = todoArrayList.find(task => task.taskId === taskId);
    if (task) {
        task.status = task.status === 'completed' ? 'incomplete' : 'completed';
        saveTasksToLocalStorage();
        renderTasks(getActiveCategory());
    }
}

// Add CSS styles
const style = document.createElement('style');
style.innerHTML = `
    .task-completed {
        color: gray;
    }
    .icon-completed i {
        color: gray !important;
    }
    .editbutton i, .Deletebutton i {
        color: rgb(87, 66, 147); 
    }
    .taskCheckbox input {
        visibility: visible; 
    }
`;
document.head.appendChild(style);


//function to filter task based on category

function filterTasks(category) {
    switch (category) {
        case 'All':
            return todoArrayList;
        case 'Assigned':
            return todoArrayList.filter(task => task.status !== 'completed');
        case 'Completed':
            return todoArrayList.filter(task => task.status === 'completed');
        default:
            return todoArrayList;
    }

}
//function to change task status 

function changeTaskStatus(taskId) {
    const task = todoArrayList.find(task => task.taskId === taskId);
    if (task) {
        task.status = task.status === 'completed' ? 'incomplete' : 'completed';
        saveTasksToLocalStorage();
        renderTasks(getActiveCategory());
    }
}
//function to clear all tasks

function clearall(event) {
    if (todoArrayList.length == 0) {
        displayMessage("No task to clear!!", "red");
    } else {
        todoArrayList = [];
        saveTasksToLocalStorage();
        renderTasks('All');
        displayMessage("All tasks are cleared!", "green");
    }
}
//function to display message 

function displayMessage(message, color) {
    errormsg.textContent = message;
    errormsg.style.color = color;
    errormsg.style.visibility = "visible";

    setTimeout(() => {
        errormsg.style.visibility = "hidden";
    }, 1500);
}

//No Task image display

function displayNoTasksImage() {
    const noTasksImage = document.createElement('img');
    noTasksImage.src = 'Images/todo.jpg';
    noTasksImage.alt = 'No tasks available';
    noTasksImage.classList.add('no-tasks-image');
    taskList.appendChild(noTasksImage);
}
//function to save lo local storage using setItem
function saveTasksToLocalStorage() {
    localStorage.setItem('todoArrayList', JSON.stringify(todoArrayList));
}
//function to load from local storage using getItem
function loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem('todoArrayList');
    if (storedTasks) {
        todoArrayList = JSON.parse(storedTasks);
    }
}
//function to update categoryy task counts
function updateCategoryHeadings() {
    allTasksCount.textContent = `All (${todoArrayList.length})`;
    assignedTasksCount.textContent = `Assigned (${todoArrayList.filter(task => task.status !== 'completed').length})`;
    completedTasksCount.textContent = `Completed (${todoArrayList.filter(task => task.status === 'completed').length})`;
}

function callFunction() {
    saveTasksToLocalStorage();
    renderTasks(getActiveCategory());
}

function setInitialActiveButton() {
    allTasksCount.classList.add('active');
}

[allTasksCount, assignedTasksCount, completedTasksCount].forEach(button => {
    button.addEventListener('click', () => {
        [allTasksCount, assignedTasksCount, completedTasksCount].forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});

function getActiveCategory() {
    if (allTasksCount.classList.contains('active')) return 'All';
    if (assignedTasksCount.classList.contains('active')) return 'Assigned';
    if (completedTasksCount.classList.contains('active')) return 'Completed';
}

