    const fs = require('fs');
    const path = require('path');
    const Chance = require('chance');
    const chance = new Chance();


    function displayMessageTest(expectedMessage, expectedColor) {
      expect(error.style.visibility).toBe('visible');
      expect(error.textContent).toBe(expectedMessage);
      expect(error.style.color).toBe(expectedColor);
      jest.advanceTimersByTime(2500);
      expect(error.style.visibility).toBe('hidden');
    };

    function addTasksToTodoList(numberOfTasks) {
      for (let i = 0; i < numberOfTasks; i++) {
          const randomInput = chance.word();
          inputField.value = randomInput;
          addButton.click();
      }
    }


        beforeEach(() => {
        
            const html = fs.readFileSync(path.resolve(__dirname, '../todo.html'), 'utf8');
            document.body.innerHTML = html;
            jest.resetModules();
            

            error = document.querySelector(".events");
            inputField = document.querySelector('#inputfield');
            addButton = document.querySelector('.addbutton');
            taskList = document.querySelector('#taskList');
            
            jest.clearAllMocks();
            // loadTasksFromLocalStorage = jest.fn();
            // callFunction = jest.fn();
            // setInitialActiveButton = jest.fn();
          

          document.addEventListener('DOMContentLoaded', () => {
            loadTasksFromLocalStorage();
            callFunction();
            setInitialActiveButton();
          });
            
          
          jest.useFakeTimers();
            // Mock localStorage
          const mockLocalStorage = (() => {
              let store = {};
              return {
                  getItem: (key) => store[key] || null,
                  setItem: (key, value) => (store[key] = value.toString()),
                  clear: () => (store = {}),
                  removeItem: (key) => delete store[key],
              };
          })();
          Object.defineProperty(window, 'localStorage', {
              value: mockLocalStorage,
          });
          localStorage.clear();
                        
                        
      ({loadTasksFromLocalStorage, editTask,
        callFunction, add,
        getActiveCategory,
        deleteElement,
        renderTasks,
        changeTaskStatus,filterTasks,clearall,displayMessage,saveTasksToLocalStorage,updateCategoryHeadings} = require('./todo.js'));
        loadTasksFromLocalStorage = jest.fn();
        callFunction = jest.fn();
        setInitialActiveButton = jest.fn();
        
    });

        afterEach(() => {jest.useRealTimers();
            localStorage.clear();
        });
        
    describe('To-Do List HTML Structure and Functionality', () => {
      test('should verify the To-Do List HTML structure and functionality', () => {
        // Check if heading exists
        const heading = document.querySelector('.heading h1');
        expect(heading).not.toBeNull();
        
        // Check heading text
        expect(heading.textContent).toBe('MY To-Do LIST!');
        
        // Check input field
        const inputField = document.getElementById('inputfield');
        expect(inputField).toBeTruthy();
        expect(inputField.maxLength).toBe(150);
        
        // Check placeholder of the input field
        expect(inputField.placeholder).toBe("Enter task...");
        
        // Check add button type and text content
        const addButton = document.querySelector('.addbutton');
        expect(addButton.type).toBe('button');
        expect(addButton.textContent).toBe('Add');
        
        // Check no task image
        const noTaskImage = document.querySelector(".Notaskimage");
        expect(noTaskImage).toBeTruthy();
        const noTaskImageStyles = window.getComputedStyle(noTaskImage);
        expect(noTaskImageStyles.display).toBe('none');
        
        // Check task list
        const taskList = document.querySelector('#taskList');
        expect(taskList).toBeTruthy();
        expect(taskList.tagName).toBe('OL');
        
        // Check source and alt of the no task image
        const imgElement = document.querySelector('.Notaskimage img');
        expect(imgElement).toBeTruthy();
        expect(imgElement.getAttribute('src')).toBe('Images/todo.jpg');
        expect(imgElement.getAttribute('alt')).toBe("No tasks image");
        
        // Check the presence of clear button and its type
        const clearButton = document.querySelector('#clearAllButton');
        expect(clearButton.style.display).toBe('');
        expect(clearButton).toBeTruthy();
        expect(clearButton.type).toBe('submit');
        expect(clearButton.textContent).toBe('Clear');
        
        // Check the style of the confirmation modal
        const modal = document.querySelector('.modal');
        const modalContent = document.querySelector('.modal-content');
        expect(modal).toBeTruthy();
        expect(modal.getAttribute('id')).toBe('confirmationModal');
        expect(modalContent).toBeTruthy();
        
        // Check the text content and type of the confirm button
        const confirmButton = document.querySelector('#confirmButton');
        expect(confirmButton).toBeTruthy();
        expect(confirmButton.textContent).toMatch(/yes/i);
        expect(confirmButton.type).toBe('submit');
        
        // Check the text content and type of the cancel button
        const cancelButton = document.querySelector('#cancelButton');
        expect(cancelButton).toBeTruthy();
        expect(cancelButton.textContent).toMatch(/no/i);
        expect(cancelButton.type).toBe('submit');
        
        // Check the presence of p tag in events
        const events = document.querySelector('.events');
        expect(events).toBeTruthy();
        
        // Check if modal button class exists within modal-content
        const modalButtons = document.querySelector('.modal-content .modal-buttons');
        expect(modalButtons).toBeTruthy();
        
        // Check the presence of p tag within modal content
        const modalText = document.querySelector('#modalText');
        expect(modalText).toBeTruthy();
        
        // Check All task icon button
        const allTasksCount = document.querySelector("#allTasksCount");
        expect(allTasksCount).toBeTruthy();
        expect(allTasksCount.textContent).toBe('All (0)');
        expect(allTasksCount.tagName).toMatch(/Button/i);
        
        // Check Assigned task icon button
        const assignedTasksCount = document.querySelector("#assignedTasksCount");
        expect(assignedTasksCount).toBeTruthy();
        expect(assignedTasksCount.textContent).toBe('Assigned (0)');
        expect(assignedTasksCount.tagName).toMatch(/Button/i);
        
        // Check Completed task icon button
        const completedTasksCount = document.querySelector("#completedTasksCount");
        expect(completedTasksCount).toBeTruthy();
        expect(completedTasksCount.textContent).toBe('Completed (0)');
        expect(completedTasksCount.tagName).toMatch(/Button/i);
      });
    });

    describe('DOMContentLoaded Event Handling', () => {
      beforeEach(() => {
          document.dispatchEvent(new Event('DOMContentLoaded'));
      });
      test('should add "active" class to the allTasksCount element', () => {
        expect(allTasksCount.classList.contains('active')).toBe(true);
    });

      test('should call loadTasksFromLocalStorage on DOMContentLoaded', () => {
          expect(loadTasksFromLocalStorage).toHaveBeenCalled();
      });
      test('should call callFunction on DOMContentLoaded', () => {
          expect(callFunction).toHaveBeenCalled();
      });
      test('should call setInitialActiveButton on DOMContentLoaded', () => {
          expect(setInitialActiveButton).toHaveBeenCalled();
      });
    });

    describe('To check add Task functionality',() =>{

      test('To check Local storage is empty',  () =>{
        expect(localStorage.getItem('todoArrayList')).toBeNull();
      })
      test('To check UI list is empty initially',()=>{
        const tasks = document.querySelectorAll('#taskList li');
        expect(tasks.length).toBe(0);
        
      })

      test('should ensure the add button is clickable and calls the add function', () => {
        const addFunctionMock = jest.fn();
        addButton.addEventListener('click', addFunctionMock);

        inputField.value = chance.word();
        addButton.click();
        expect(addFunctionMock).toHaveBeenCalled();
        expect(addButton.disabled).toBe(false);
        const tasks = document.querySelectorAll('#taskList li');
        expect(tasks.length).toBe(1);
        expect(tasks[0].textContent).toContain(inputField.value);
        
      });

      
        test('should correctly select inputField element', () => {
          expect(inputField).not.toBeNull();
          expect(inputField.id).toBe('inputfield');
        });

        test('should correctly select taskList element', () => {
          expect(taskList).not.toBeNull();
          expect(taskList.tagName).toBe('OL'); 
        });

        test('should add a single task and render it correctly', () => {

          const randomInput = chance.word();
          inputField.value = randomInput;
          addButton.click();
          
          const tasks = document.querySelectorAll('#taskList li');
          expect(tasks.length).toBe(1);
          
          const taskName = tasks[0].querySelector('.taskname');
          expect(taskName.textContent).toBe(randomInput);

          const doneIcon = tasks[0].querySelector('.done i');
          expect(doneIcon).not.toBeNull();
          expect(doneIcon.classList).toContain('fa-circle-check');

          const editButton = tasks[0].querySelector('.editbutton button');
          expect(editButton).not.toBeNull();
          expect(editButton.querySelector('i').classList).toContain('fa-pen-to-square');

          const deleteButton = tasks[0].querySelector('.Deletebutton button');
          expect(deleteButton).not.toBeNull();
          expect(deleteButton.querySelector('i').classList).toContain('fa-trash');
          displayMessageTest('Task added successfully!','green')
      });

        test('should not add spaces as a task  and error message should be displayed', () => {
          inputField.value = '      ';
          addButton.click();
          const tasks = document.querySelectorAll('#taskList li');
          expect(tasks.length).toBe(0);
          displayMessageTest('Invalid input. Please enter a task.','red');
        });
        

        test('should display error message if Input field is empty and Enter is pressed', () => {
          inputField.value = '';
          const enterEvent = new KeyboardEvent('keyup', { key: 'Enter' });
          inputField.dispatchEvent(enterEvent);
          const tasks = document.querySelectorAll('#taskList li');
          expect(tasks.length).toBe(0);
          displayMessageTest('Invalid input. Please enter a task.','red');
        });
        test('shouldnot add a task only with spaces when Enter is pressed', () => {
          
          inputField.value = '         ';
          const enterEvent = new KeyboardEvent('keyup', { key: 'Enter' });
          inputField.dispatchEvent(enterEvent);
      
          const tasks = document.querySelectorAll('#taskList li');
          expect(tasks.length).toBe(0);
          displayMessageTest('Invalid input. Please enter a task.','red')
        });
        
        test('shouldnot add a task if Input field has task and  when key other than enter is pressed', () => {
          
          const randomInput = chance.word();
          inputField.value = randomInput;
          const enterEvent = new KeyboardEvent('keyup', { key: 'shift' });
          inputField.dispatchEvent(enterEvent);
      
          const tasks = document.querySelectorAll('#taskList li');
          expect(tasks.length).toBe(0);
        });


        test('should add a task if Enter is pressed', () => {

          const randomInput = chance.word();
          inputField.value = randomInput;
          addButton.click();
          const enterEvent = new KeyboardEvent('keyup', { key: 'Enter' });
          inputField.dispatchEvent(enterEvent);
      
          const tasks = document.querySelectorAll('#taskList li');
          expect(tasks.length).toBe(1);
        });
      
        test('should add a task with leading spaces', () => {
      
          const randomInput = chance.word();
          inputField.value = randomInput;
          addButton.click();
          const tasks = document.querySelectorAll('#taskList li');
          expect(tasks.length).toBe(1);
          expect(tasks[0].textContent).toContain(randomInput);
          expect(localStorage.getItem('todoArrayList')).toContain(randomInput);
          displayMessageTest('Task added successfully!','green');
          jest.runAllTimers(2500);
          expect(error.style.visibility).toBe('hidden');
      });
      

        test('should display an error message for empty input', () => {
          inputField.value = '';
          addButton.click();
          displayMessageTest('Invalid input. Please enter a task.','red');
        });

        test('should add two tasks and render both correctly', () => {
          const randomInput = chance.word();
          inputField.value = randomInput;
          addButton.click();
          const randInput2 = chance.word();
          inputField.value = randInput2;
          addButton.click();
            const savedTasks = JSON.parse(localStorage.getItem('todoArrayList'));
            expect(savedTasks.length).toBe(2);
            expect(savedTasks[0].taskName).toBe(randomInput);
            expect(savedTasks[1].taskName).toBe(randInput2

            );
        });
        test('should not accept two task of similar name', () => {
          const randomInput = chance.word();
          inputField.value = randomInput;
          addButton.click();
          const randInput2 = chance.word();
          inputField.value = randInput2;
          addButton.click();
          inputField.value = randInput2;
          addButton.click();
          displayMessageTest('Task already exists.','red')
      });
    });

    describe('Edit Functionality', () => {
      let taskElement, editButton, editInput, saveButton, clearButton;

      beforeEach(() => {
        addTasksToTodoList(2);
          
          const todos = JSON.parse(localStorage.getItem('todoArrayList'));
          expect(todos).not.toBeNull(); 
          expect(todos.length).toBe(2);

          const taskId = todos[0].taskId;
          taskElement = document.querySelector(`#taskList li[data-id="${taskId}"]`);
          editButton = taskElement.querySelector('.editbutton button');
          clearButton = document.querySelector('#clearAllButton');
          
      });

      test('should edit a task successfully and update localStorage', () => {
          const todos = JSON.parse(localStorage.getItem('todoArrayList'));
          const taskId = todos[0].taskId;

          expect(editButton).not.toBeNull(); 
          editButton.click();

          editInput = taskElement.querySelector('.edit-input');
          expect(editInput).not.toBeNull(); 
          const newTaskName = chance.word();
          editInput.value = newTaskName;

          saveButton = taskElement.querySelector('.editbutton button'); 
          expect(saveButton).not.toBeNull(); 
          saveButton.click(); 

          const updatedTodos = JSON.parse(localStorage.getItem('todoArrayList'));
          expect(updatedTodos).not.toBeNull(); 
          expect(updatedTodos.length).toBe(2); 
          expect(updatedTodos[0].taskId).toBe(taskId); 
          expect(updatedTodos[0].taskName).toBe(newTaskName);

          displayMessageTest('Task edited successfully!', 'green');
      });

      test('should not change other task names when one task is edited', () => {
          const todos = JSON.parse(localStorage.getItem('todoArrayList'));
          const taskId = todos[0].taskId;

          expect(editButton).not.toBeNull(); 
          editButton.click();

          editInput = taskElement.querySelector('.edit-input');
          expect(editInput).not.toBeNull(); 
          const editedInput = chance.word();
          editInput.value = editedInput;

          saveButton = taskElement.querySelector('.editbutton button'); 
          expect(saveButton).not.toBeNull(); 
          saveButton.click(); 

          const updatedTodos = JSON.parse(localStorage.getItem('todoArrayList'));
          expect(updatedTodos).not.toBeNull();
          expect(updatedTodos.length).toBe(2); 
          expect(updatedTodos[0].taskId).toBe(taskId); 
          expect(updatedTodos[0].taskName).toBe(editedInput);

          displayMessageTest('Task edited successfully!', 'green');
      });

      test('should not edit a task if the entered task is only space', () => {
          const todos = JSON.parse(localStorage.getItem('todoArrayList'));
          const taskId = todos[0].taskId;
          const taskElement = document.querySelector(`#taskList li[data-id="${taskId}"]`);
          const editButton = taskElement.querySelector('.editbutton button');
          editButton.click();
      
          const editInput = taskElement.querySelector('.edit-input');
          expect(editInput).not.toBeNull();
          editInput.value = '    ';
          
          const saveButton = taskElement.querySelector('.editbutton button'); 
          saveButton.click(); 

          displayMessageTest('Invalid input. Please enter a valid task name.', 'red');
      });

      test('should disable input field and add button when edit task is active', () => {
          expect(editButton).not.toBeNull(); 
          editButton.click();

          expect(inputField.disabled).toBe(true);
          expect(addButton.disabled).toBe(true);
          expect(clearButton.disabled).toBe(true);
      });

      test('should enable input field and add button when editing is done', () => {
          expect(editButton).not.toBeNull(); 
          editButton.click();

          editInput = taskElement.querySelector('.edit-input');
          expect(editInput).not.toBeNull();
          editInput.value = chance.word();

          saveButton = taskElement.querySelector('.editbutton button'); 
          expect(saveButton).not.toBeNull(); 
          saveButton.click(); 

          expect(inputField.disabled).toBe(false);
          expect(addButton.disabled).toBe(false);
          expect(clearButton.disabled).toBe(false);
      });
      test('should not edit task with task name same as present', () => {
        const todos = JSON.parse(localStorage.getItem('todoArrayList'));
        const existingTaskName = todos[1].taskName; 
        
        editButton.click();
        editInput = taskElement.querySelector('.edit-input');
        expect(editInput).not.toBeNull();
        editInput.value = existingTaskName;
        saveButton = taskElement.querySelector('.editbutton button'); 
        expect(saveButton).not.toBeNull();
        saveButton.click(); 

        displayMessageTest("Task name already exists.", "red");
        expect(inputField.disabled).toBe(false);
        expect(addButton.disabled).toBe(false);
        expect(clearButton.disabled).toBe(false);
        const updatedTodos = JSON.parse(localStorage.getItem('todoArrayList'));
        expect(updatedTodos[0].taskName).not.toBe(existingTaskName);
    });

    });
      
      describe('Deleting a task', () => {
        let deleteButton;
        let confirmButton;
        let cancelButton;

        beforeEach(() => {
          addTasksToTodoList(1);

            // Ensure elements are present before querying
            deleteButton = document.querySelector('.Deletebutton button');
            confirmButton = document.querySelector('#confirmButton');
            cancelButton = document.querySelector('#cancelButton');
        });

        test('should delete task on clicking delete icon and clicking yes in confirmation modal', () => {
            const todos = JSON.parse(localStorage.getItem('todoArrayList'));
            expect(todos).not.toBeNull();
            expect(todos.length).toBe(1);

            const taskId = todos[0].taskId;
            const taskName = todos[0].taskName;

            expect(deleteButton).not.toBeNull();
            deleteButton.click();

            expect(modalText.textContent).toBe(`Are you sure you want to delete the task '${taskName}'?`);

            expect(confirmButton).not.toBeNull();
            confirmButton.click();

            setTimeout(() => {
                const updatedTaskElement = JSON.parse(localStorage.getItem('todoArrayList'));
                expect(updatedTaskElement).toHaveLength(0);
                displayMessageTest(`Task '${taskName}' deleted successfully!`, 'green');
                expect(error.style.visibility).toBe('hidden');
            }, 0);
        });

        test('should not delete task on clicking cancel button in the confirmation modal', () => {
            const todos = JSON.parse(localStorage.getItem('todoArrayList'));
            expect(todos).not.toBeNull();
            expect(todos.length).toBe(1);

            expect(deleteButton).not.toBeNull();
            deleteButton.click();

            expect(cancelButton).not.toBeNull();
            cancelButton.click();

            expect(confirmationModal.style.display).toBe('none');

            const updatedTaskElement = JSON.parse(localStorage.getItem('todoArrayList'));
            expect(updatedTaskElement).toHaveLength(1);
        });

        test('should show and hide the modal correctly when clicking delete and cancel', () => {
            expect(deleteButton).not.toBeNull();
            deleteButton.click();

            expect(confirmationModal.style.display).toBe('flex');

            expect(cancelButton).not.toBeNull();
            cancelButton.click();

            expect(confirmationModal.style.display).toBe('none');

            const todos = JSON.parse(localStorage.getItem('todoArrayList'));
            expect(todos).toHaveLength(1);
        });
    });

      

      describe('Status change - checkbox functionality', () => {

        beforeEach(() => {
          addTasksToTodoList(2);
        });
      
        const getTaskStatus = (index) => {
          const todos = JSON.parse(localStorage.getItem('todoArrayList'));
          return todos ? todos[index].status : null;
        };
      
        test('should change the status of one task without affecting the other', () => {
          const checkbox = document.querySelectorAll('.done i');
          checkbox[0].click();

          expect(getTaskStatus(0)).toBe('completed');
          expect(getTaskStatus(1)).toBe('incomplete');
          checkbox[0].click();
          expect(getTaskStatus(0)).toBe('incomplete');
          expect(getTaskStatus(1)).toBe('incomplete');
        });
      
      });
      

      describe('Filter functionality', () => {
        let notaskimag;
        beforeEach(() => {
          addTasksToTodoList(2);
      
          const savedTasks = JSON.parse(localStorage.getItem('todoArrayList'));
          expect(savedTasks.length).toBe(2);
      
          notaskimag = document.querySelector('.Notaskimage');
          allTasksInDOM = taskList.querySelectorAll('.Listelements');
        });
      
        const getTaskCount = (selector) => document.querySelectorAll(selector).length;
      
        const verifyNoTasksImage = (shouldBeVisible) => {
          const styles = window.getComputedStyle(notaskimag);
          expect(styles.display).toBe(shouldBeVisible ? 'flex' : 'none');
        };
      
        test('should display all tasks', () => {
          allTasksCount.click();
      
          expect(getTaskCount('.Listelements')).toBe(2);
          expect(allTasksCount.textContent).toBe('All (2)');
        });
      
        test('should filter assigned tasks on clicking assigned', () => {
          const taskDoneButtons = taskList.querySelectorAll('.done i');
          taskDoneButtons[0].click();
      
          const savedTasks = JSON.parse(localStorage.getItem('todoArrayList'));
          expect(savedTasks[0].status).toBe('completed');
      
          assignedTasksCount.click();
      
          const assignedTasks = savedTasks.filter(task => task.status === 'incomplete');
          expect(assignedTasks.length).toBe(1);
          expect(getTaskCount('.Listelements:not(.completed)')).toBe(1);
          expect(assignedTasksCount.textContent).toBe('Assigned (1)');
        });
      
        test('should filter all completed tasks on clicking completed', () => {
          const taskDoneButtons = taskList.querySelectorAll('.done i');
          taskDoneButtons[0].click();
      
          const savedTasks = JSON.parse(localStorage.getItem('todoArrayList'));
          expect(savedTasks[0].status).toBe('completed');
      
          completedTasksCount.click();
      
          const completedTasks = savedTasks.filter(task => task.status === 'completed');
          expect(completedTasks.length).toBe(1);
          expect(getTaskCount('.completed')).toBe(1);
      
          verifyNoTasksImage(false);
          expect(completedTasksCount.textContent).toBe('Completed (1)');
        });
      
        test('should display No Task Image if the tab is empty', () => {
          completedTasksCount.click();
      
          const savedTasks = JSON.parse(localStorage.getItem('todoArrayList'));
          const completedTasks = savedTasks.filter(task => task.status === 'completed');
          expect(completedTasks.length).toBe(0);
      
          verifyNoTasksImage(true);
        });
      });
      
    describe('Clear task Functionality', () => {
        let clearButton, confirmButton, cancelButton, taskDoneButtons, allTasksCount, completedTasksCount, assignedTasksCount, savedTasks, randomInput, randInput2;

        beforeEach(() => {
            randomInput = chance.word();
            inputField.value = randomInput;
            addButton.click();

            randInput2 = chance.word();
            inputField.value = randInput2;
            addButton.click();

            savedTasks = JSON.parse(localStorage.getItem('todoArrayList'));
            expect(savedTasks.length).toBe(2);

            taskDoneButtons = taskList.querySelectorAll('.done i');
            allTasksCount = document.querySelector('#allTasksCount');
            completedTasksCount = document.querySelector('#completedTasksCount');
            assignedTasksCount = document.querySelector('#assignedTasksCount');
            clearButton = document.querySelector('.clearbutton');
            confirmButton = document.querySelector('#confirmButton');
            cancelButton = document.querySelector('#cancelButton');
        });

        describe('Clear Completed Tasks', () => {
            test('should clear completed tasks on clicking clear', () => {
                taskDoneButtons[0].click();
                savedTasks = JSON.parse(localStorage.getItem('todoArrayList'));
                expect(savedTasks[0].status).toBe('completed');

                completedTasksCount.click();
                const completedSection = document.querySelector('.completed');
                expect(completedSection).not.toBeNull();

                clearButton.click();
                confirmButton.click();

                savedTasks = JSON.parse(localStorage.getItem('todoArrayList'));
                const completedTasks = savedTasks.filter(task => task.status === 'completed');
                expect(completedTasks.length).toBe(0);
                const completedTasksInDOM = taskList.querySelectorAll('.completed');
                expect(completedTasksInDOM.length).toBe(0);
                displayMessageTest('Completed tasks cleared successfully!', 'green');
            });
        });

        describe('Clear Assigned Tasks', () => {
            test('should clear assigned (incomplete) tasks on clicking clear', () => {
                taskDoneButtons[0].click();
                assignedTasksCount.click();

                const assignedSectionTasks = filterTasks('Assigned');
                expect(assignedSectionTasks.length).toBe(1);
                expect(assignedSectionTasks[0].taskName).toBe(randInput2);

                clearButton.click();
                confirmButton.click();

                savedTasks = JSON.parse(localStorage.getItem('todoArrayList'));
                const incompleteTasks = savedTasks.filter(task => task.status === 'incomplete');
                expect(incompleteTasks.length).toBe(0);
                const completedTasks = savedTasks.filter(task => task.status === 'completed');
                expect(completedTasks.length).toBe(1);
                expect(completedTasks[0].taskName).toBe(randomInput);
                expect(assignedTasksCount.textContent).toBe('Assigned (0)');
            });
        });

        describe('Clear All Tasks', () => {
            test('should clear all tasks on clicking clear', () => {
                taskDoneButtons[0].click();
                allTasksCount.click();

                const allSectionTasks = filterTasks('All');
                expect(allSectionTasks.length).toBe(2);

                clearButton.click();
                const modalContent = document.querySelector('#modalText');
                const activeCategory = getActiveCategory();
                expect(modalContent.textContent).toBe(`Are you sure you want to clear ${activeCategory} tasks?`);
                expect(document.querySelector('.modal').style.display).toBe('flex');

                confirmButton.click();
                displayMessageTest('All tasks cleared successfully!', 'green');

                savedTasks = JSON.parse(localStorage.getItem('todoArrayList'));
                expect(savedTasks.length).toBe(0);
                const tasksInDOM = taskList.querySelectorAll('.Listelements');
                expect(tasksInDOM.length).toBe(0);
                expect(allTasksCount.textContent).toBe('All (0)');
            });

            test('should not clear tasks on clicking cancel button', () => {
                taskDoneButtons[0].click();
                allTasksCount.click();

                const allSectionTasks = filterTasks('All');
                expect(allSectionTasks.length).toBe(2);

                clearButton.click();
                const modalContent = document.querySelector('#modalText');
                const activeCategory = getActiveCategory();
                expect(modalContent.textContent).toBe(`Are you sure you want to clear ${activeCategory} tasks?`);
                expect(document.querySelector('.modal').style.display).toBe('flex');

                cancelButton.click();
                expect(document.querySelector('.modal').style.display).toBe('none');

                savedTasks = JSON.parse(localStorage.getItem('todoArrayList'));
                expect(savedTasks.length).toBe(2);
                const tasksInDOM = taskList.querySelectorAll('.Listelements');
                expect(tasksInDOM.length).toBe(2);
            });
        });
    });

    describe('check clear for no tasks in "All" category', () => {
      test('should display error message when no tasks are available to clear', () => {
        allTasksCount.click();
        todoArrayList = []; 
        saveTasksToLocalStorage(); 
        renderTasks('All'); 

        // Click the "Clear" button
        const clearButton = document.querySelector('.clearbutton');
        clearButton.click();
        displayMessageTest('No All tasks to clear.', 'red')
        
      });
    });

