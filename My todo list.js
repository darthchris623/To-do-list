console.log('My todo list'); //This is just for identification.
const createNewTask = document.querySelector('#addTask'); //Add task button.
const form = document.querySelector('form');
const todoList = document.querySelector('ul');
const todoTask = document.querySelector('li')
todoList.classList = 'todo';
todoList.setAttribute('id', 'new-task');

//Retrieve from local storage.
const storedTodos = JSON.parse(localStorage.getItem('task')) || [];
for (let i = 0; i < storedTodos.length; i++) {
    let newTodoDiv = document.createElement("div");
    let storedTask = document.createElement('li');
    storedTask.innerText = storedTodos[i].task;
    storedTask.isCompleted = storedTodos[i].isCompleted ? true : false;
    storedTask.setAttribute('id', 'task');//gives new LI ID of 'task'
    let newDeleteButton = document.createElement('button'); //recreates new Delete button
    newDeleteButton.innerText = 'Delete';
    newDeleteButton.setAttribute('id', 'delete');
    newDeleteButton.setAttribute('style', 'margin:5px');
    newTodoDiv.append(storedTask);
    newTodoDiv.append(newDeleteButton);
    if (storedTodos[i].isCompleted === true) {
        storedTask.isCompleted = true;
        storedTask.classList = "completed"
    }
    else {
        storedTask.isCompleted = false;
    }
    todoList.append(newTodoDiv);
};

//EVENT DELEGATION: delete buttons
todoList.addEventListener('click', function (e) {
  if (e.target.tagName === "BUTTON") {
    let todos = storedTodos.filter(
      (item) => item.task !== e.target.parentNode.firstChild.innerText
    );
    localStorage.setItem("task", JSON.stringify(todos));
    e.target.parentNode.remove();
    location.reload();
  }
    if (e.target.tagName === 'LI') {
      if (!e.target.isCompleted) {
        e.target.classList = "completed";
        e.target.isCompleted = true;
      } else {
        e.target.classList.remove("completed");
        e.target.isCompleted = false;
      }
      //sets local storage item true when done
      for (let i = 0; i < storedTodos.length; i++) {
        if (storedTodos[i].task === e.target.innerText) {
          //toggleing it from true to false when clicked on
          storedTodos[i].isCompleted = !storedTodos[i].isCompleted;
          localStorage.setItem("task", JSON.stringify(storedTodos));
        }
      }
    }
});

// This code will create a new task in the list complete with a "Delete" button.
createNewTask.addEventListener('click', function (e) {
    e.preventDefault();
    let newTaskInput = document.getElementById('new-task'); //Text input
    let newTodoDiv = document.createElement("div");
    let newTask = document.createElement('li');//creates new list item
    let deleteButton = document.createElement('button'); //creates new Delete button
    newTask.innerText = newTaskInput.value; //Inserts the text from the input into the LI
    newTask.classList = 'todo';//gives new LI class of 'todo'
    newTask.setAttribute('id', 'task');//gives new LI ID of 'task'
    newTask.isCompleted = false;
    deleteButton.innerText = 'Delete';
    deleteButton.setAttribute('id', 'delete');
    deleteButton.setAttribute('style', 'margin:5px');
    newTodoDiv.appendChild(newTask);
    newTodoDiv.appendChild(deleteButton);
    todoList.append(newTodoDiv);
    //Save to localstorage
    storedTodos.push({ task: newTaskInput.value, isCompleted: false });//Input value
    localStorage.setItem('task', JSON.stringify(storedTodos));
    // newTaskInput.value = '';
    form.reset();
});
