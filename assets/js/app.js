import { todoItemElement } from './todoItemElement.js';

const renderTodos = () => {
  const items = document.querySelector('.items');

  items.innerHTML = todoItemElement('Hi you');
};
