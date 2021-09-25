import { todoItemElement } from './todoItemElement.js';
import { validInput } from './validInput.js';

//ADD todos to LocalStorage
const addToLocalStorage = () => {
  const addBtn = document.querySelector('.add__btn');
  const addTxt = document.querySelector('.add__text');

  addBtn.addEventListener('click', () => {
    if (validInput(addTxt)) {
      localStorage.setItem(
        'todos',
        JSON.stringify({
          id: Date.now(),
          text: addTxt.value,
          completed: false
        })
      );
    }
  });
};

const renderTodos = () => {
  const items = document.querySelector('.items');

  items.innerHTML = todoItemElement('Hi you');
};

addToLocalStorage();
