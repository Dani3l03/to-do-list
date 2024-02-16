// seleção de elementos
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const editForm = document.getElementById('edit-form');
const editInput = document.getElementById('edit-input');
const cancelEditButton = document.getElementById('cancel-edit-button');
const elementList = document.querySelector(".todo");

let oldInputValue;

// funções

function saveTodo(text){
    const todo = document.createElement("div")
    todo.classList.add("todo");

    const title = document.createElement("h3")
    title.innerText = text;
    todo.appendChild(title);

    const done = document.createElement("button");
    done.classList.add("finish");
    done.innerHTML = '<i class="fa-solid fa-check"></i>';

    const edit = document.createElement("button");
    edit.classList.add("edit");
    edit.innerHTML = '<i class="fa-solid fa-pen"></i>';

    const remove = document.createElement("button");
    remove.classList.add("remove");
    remove.innerHTML = '<i class="fa-solid fa-xmark">';

    todo.appendChild(done);
    todo.appendChild(edit);
    todo.appendChild(remove);

    todoList.appendChild(todo);

    todoInput.value = "";
    todoInput.focus();
}

function toggleForms(){
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
}

function cancelEdit(event){
    event.preventDefault();
    toggleForms();
}

function sendTodoForm(event){
    event.preventDefault()
    const inputValue = todoInput.value;

    if(inputValue){
        saveTodo(inputValue);
    }
}

function buttonListTask(event){
    const targetElement = event.target;
     const parentElement = targetElement.closest("div");
     let todoTitle;

     if(parentElement && parentElement.querySelector("h3")){
        todoTitle = parentElement.querySelector("h3").innerText;
     }

    if (targetElement.classList.contains("finish")){
        parentElement.classList.toggle("done");
    }
    if (targetElement.classList.contains("remove")){
        parentElement.remove();
    }
    if (targetElement.classList.contains("edit")){
        toggleForms();

        editInput.value = todoTitle;
        oldInputValue = todoTitle;
    }
}

function updateTodo(editInputValue){
    const todos = document.querySelectorAll(".todo")

    todos.forEach((todo)=>{
        let todoTitle = todo.querySelector("h3")

        if(todoTitle.innerText === oldInputValue){
            todoTitle.innerText = editInputValue;
        }
    })
}

function newTodoTitleEdit(event){
    event.preventDefault();

    const editInputValue = editInput.value;

    if(editInputValue){
        updateTodo(editInputValue)
    }

    toggleForms();
}

// eventos

todoForm.addEventListener("submit", sendTodoForm);

document.addEventListener("click", buttonListTask);

cancelEditButton.addEventListener("click", cancelEdit);

editForm.addEventListener("submit", newTodoTitleEdit)