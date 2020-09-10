//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);
document.addEventListener('DOMContentLoaded', getTodos);

//Functions
function addTodo(event) {
    //Prevent form from submitting
    event.preventDefault();
    //Todo Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //Create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //Add ToDo To LocalStorage
    saveLocalTodos(todoInput.value);
    //Check Mark Button
    const completeButton = document.createElement('Button');
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);
    //Check Trash Button
    const trashButton = document.createElement('Button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //Append To List
    todoList.appendChild(todoDiv);
    //Clear ToDo Input Value
    todoInput.value = "";
}

function deleteCheck(e) {
    const item = e.target;
    //Delete ToDo
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        //Animation
        todo.classList.add("fall");
        removeLocalTodos();
        todo.addEventListener('transitionend', function () {
            todo.remove();
        });
    }

    //Check Mark
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed')
    }
}

//Filter Todo
function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                }
                else {
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                }
                else {
                    todo.style.display = 'none';
                }
                break;
        }
    });
}

//
function saveLocalTodos(todo) {
    //Check---Hey Do I already have thing in there?
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}
//
// function getTodos() {
//     //Check---Hey Do I already have thing in there?
//     let todos;
//     if (localStorage.getItem('todos') === null) {
//         todos = [];
//     }
//     else {
//         todos = JSON.parse(localStorage.getItem('todos'));
//     }
//     todos.forEach(function (todo) {
//         //Todo Div
//         const todoDiv = document.createElement('div');
//         todoDiv.classList.add('todo');
//         //Create li
//         const newTodo = document.createElement('li');
//         newTodo.innerText = todoInput.value;
//         newTodo.classList.add('todo-item');
//         todoDiv.appendChild(newTodo);
//         //Check Mark Button
//         const completeButton = document.createElement('Button');
//         completeButton.innerHTML = '<i class="fas fa-check"></i>';
//         completeButton.classList.add("complete-btn");
//         todoDiv.appendChild(completeButton);
//         //Check Trash Button
//         const trashButton = document.createElement('Button');
//         trashButton.innerHTML = '<i class="fas fa-trash"></i>';
//         trashButton.classList.add("trash-btn");
//         todoDiv.appendChild(trashButton);
//         //Append To List
//         todoList.appendChild(todoDiv);
//     });
// }

// function removeLocalTodos() {
//     //Check---Hey Do I already have thing in there?
//     let todos;
//     if (localStorage.getItem('todos') === null) {
//         todos = [];
//     }
//     else {
//         todos = JSON.parse(localStorage.getItem('todos'));
//     }
//     const todoIndex = todo.children[0].innerText;
//     todos.splice(todos.indexOf(todoIndex), 1)
//     localStorage.setItem('todos', JSON.stringify(todos));
// }


