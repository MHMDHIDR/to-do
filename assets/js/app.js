import { todoItemElement } from './todoItemElement.js'
import { validInput } from './validInput.js'

renderTodos()
addToLocalStorage()

//ADD todos to LocalStorage
function addToLocalStorage() {
  let todos = []
  const addBtn = document.querySelector('[data-add-todo]')
  const addTxt = document.querySelector('[data-todo-text]')

  addBtn.addEventListener('click', () => {
    const { isValid } = validInput(addTxt)

    if (isValid) {
      todos.push({
        id: Date.now(),
        text: addTxt.value,
        completed: false
      })

      localStorage.setItem('todos', JSON.stringify(todos))

      renderTodos()
      addTxt.value = ''
      addTxt.focus()
    }
  })
}

function renderTodos() {
  const items = document.querySelector('.items')
  const todos = JSON.parse(localStorage.getItem('todos')) || []

  todos.map(todo => {
    items.insertAdjacentHTML('beforeend', todoItemElement(todo.text, todo.id))
  })
}

console.log(JSON.parse(localStorage.getItem('todos')))
