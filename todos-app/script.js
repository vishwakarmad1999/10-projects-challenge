const form = document.querySelector("form")
const todosContainer = document.querySelector(".todos-container")
const textInput = document.getElementById("text-input")
const todos = JSON.parse(localStorage.getItem("todos"))

if (todos) {
    todos.forEach(todo => {
        addNewTodo(todo.text, todo.checked)
    })
}

form.addEventListener("submit", (e) => {
    if (textInput.value) {
        e.preventDefault()
        addNewTodo(textInput.value)
        textInput.value = ""
    }
})

function updateLS() {
    const todoTextEls = document.querySelectorAll(".todo-text")
    const todos = []
    todoTextEls.forEach(todo => {
        const temp = {
            text: todo.innerText,
            checked: todo.classList.contains("checked")
        }
        todos.push(temp)
    })
    localStorage.setItem("todos", JSON.stringify(todos))
}

function addNewTodo(text, checked = false) {
    const todo = document.createElement("div")

    todo.innerHTML = `
        <div class="todo d-flex justify-content-between">
            <p class="todo-text">${text}</p>
        </div>
    `

    const todoText = todo.querySelector(".todo-text")
    
    if (checked) {
        todoText.classList.add("checked")
    }

    todo.addEventListener("click", () => {
        todoText.classList.toggle("checked")
        updateLS()
    })
    
    todo.addEventListener("contextmenu", e => {
        e.preventDefault()
        todo.remove()
        updateLS()
    })

    todosContainer.append(todo)
    updateLS()
}