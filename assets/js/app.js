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

      addTxt.value = '';
      renderTodos();
    }
  });
};

const renderTodos = () => {
  const items = document.querySelector('.items');
  const todos = JSON.parse(localStorage.getItem('todos')) || [];

  items.innerHTML = todos.map((todo) => todoItemElement(todo.text, todo.id));
};

renderTodos();
addToLocalStorage();
