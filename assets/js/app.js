// Selectors
const restBtn = document.querySelector(".fa-redo");
const tasks = document.querySelector(".tasks");
const appContainer = document.querySelector(".app-container");
const addBtn = document.querySelector(".add-btn");
const inputTask = document.getElementById("task-input");

// Classes

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle";
const DONE = "line-through";

// EventListeners
addBtn.addEventListener("click", addTask);

// Make actions depending on what element is clicked
appContainer.addEventListener("click", makeAction);

// Clear All tasks
restBtn.addEventListener("click", () => {
  // location.reload();
});

// Functions
function addTask(e) {
  // prevent the form from submitting
  e.preventDefault();
  // Don't Insert empty values
  if (inputTask.value == "" || inputTask.value.trim().length == 0) return;
    
  // insert task into task list
  const taskElement = 
  `<li class="task">
    <i class="far fa-circle action-btn"></i>
    <p class="todo">${inputTask.value}</p>
    <div class="options">
      <i class="far fa-edit action-btn"></i>
      <i class="fas fa-thumbtack action-btn"></i>
      <i class="far fa-trash-alt action-btn"></i>
    </div>
  </li>`;

  tasks.insertAdjacentHTML("beforeend", taskElement);
  inputTask.value = "";
}

function makeAction(e) {
  const targetElem = e.target;
  
  const reset = document.querySelector('.reset > .action-btn');

  const hambCheck = document.querySelector('.hamburger-menu > input[type="checkbox"]');
  const menuOverlay = document.querySelector('.menu > .overlay');
  
  const main = tasks.querySelectorAll('*');
  const footer = document.querySelectorAll('.app-container > footer *');
  

  if (targetElem == reset) { // clear all list
    if(!confirm('Are You Sure You Want to Delete All Tasks (This can\'t be Undone!)?')) return;
    tasks.innerHTML = '';
  } else if(targetElem == hambCheck) {
    menuOverlay.classList.toggle('show');
    main.classList.toggle('pointerEveNone');
    footer.classList.toggle('pointerEveNone');
  }
  

  if (targetElem.classList.contains(UNCHECK)) {
    targetElem.classList.remove(UNCHECK);
    targetElem.classList.add(CHECK);
    targetElem.nextElementSibling.classList.add(DONE);
  } else if (targetElem.classList.contains(CHECK)) {
    targetElem.classList.remove(CHECK);
    targetElem.nextElementSibling.classList.remove(DONE);
    targetElem.classList.add(UNCHECK);
  } else if (targetElem.classList.contains("fa-trash-alt")) {
    targetElem.parentNode.parentNode.remove();
  }
}
