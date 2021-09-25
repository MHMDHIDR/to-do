import { todoItemElement } from './todoItemElement.js';
import { validInput } from './validInput.js';

//ADD todos to LocalStorage
const addToLocalStorage = () => {
  let todo = [];
  const addBtn = document.querySelector('.add__btn');
  const addTxt = document.querySelector('.add__text');

  addBtn.addEventListener('click', () => {
    if (validInput(addTxt)) {
      todo.push({
        id: Date.now(),
        text: addTxt.value,
        completed: false
      });

      localStorage.setItem('todos', JSON.stringify(todo));

      renderTodos();
      addTxt.value = '';
      addTxt.focus();
    }
  });
};

const renderTodos = () => {
  const items = document.querySelector('.items');
  const todos = JSON.parse(localStorage.getItem('todos')) || [];

  todos.map((todo) => {
    items.insertAdjacentHTML('beforeend', todoItemElement(todo.text, todo.id));
  });
};

renderTodos();
addToLocalStorage();
