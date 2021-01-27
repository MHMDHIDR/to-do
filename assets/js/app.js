// global selectors
const appContainer = document.querySelector(".app-container");
const menuOverlay = document.querySelector('.menu > .overlay');

const hambMenu = document.querySelector('.hamburger-menu');
const reset = document.querySelector('.reset > .action-btn');
const welcomePhrase = document.querySelector('#welcomePhrase');

const tasks = document.querySelector(".tasks");
const addBtn = document.querySelector(".add-btn");
const inputTask = document.getElementById("task-input");

const footer = document.querySelector('.app-container > footer');


// show welcomePhrases Randomly
/* 
  html decimal code from:
  https://www.w3schools.com/charsets/ref_emoji_smileys.asp
*/
const welcomePhrasesEn = [
  'plan the day &#128513;', // 😁
  'you got this	&#128170; &#128521;', // 💪😉
  'how are you doing today? &#129300;', // 🤔
  'you can accomplish anything! &#128515;' // 😃
];
const randomPhraseIndex = Math.floor(Math.random() * welcomePhrasesEn.length);
welcomePhrase.innerHTML = welcomePhrasesEn[randomPhraseIndex];


// EventListeners
// addBtn.addEventListener("click", addTask);

appContainer.addEventListener("click", makeAction);

// Main Function
function makeAction(e) {
  // prevent the form from submitting
  e.preventDefault();
  // make an action based on the target
  const targetElem = e.target;
  
  // clear tasks
  if(targetElem === reset) { clearTasks() }

  // add task
  if(targetElem === addBtn) { addTask() }

  // toggle menu
  if(targetElem === hambMenu) { toggleMenu() }
  

  // check or uncheck
  const CHECK = "fa-check-circle";
  const UNCHECK = "fa-circle";
  const DONE = "line-through";

  /* === check and uncheck an item === */
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


/* === toggle menu === */
const toggleMenu = () => {
  hambMenu.classList.toggle('active');
  menuOverlay.classList.toggle('active');
}


/* === add task to list === */
const addTask = (e) => {
  // Don't Insert empty values
  if (inputTask.value == "" || inputTask.value.trim().length == 0) return;
    
  // insert task into task list
  const taskTemplate = 
  `<li class="task">
    <i class="far fa-circle action-btn"></i>
    <p class="todo">${inputTask.value}</p>
    <div class="options">
      <i class="far fa-edit action-btn"></i>
      <i class="fas fa-thumbtack action-btn"></i>
      <i class="far fa-trash-alt action-btn"></i>
    </div>
  </li>`;

  tasks.insertAdjacentHTML("beforeend", taskTemplate);
  inputTask.value = "";
  // set foucs again for task input element
  inputTask.setAttribute("autofocus", "on");
}


/* === clear all list === */
const clearTasks = () => {
  if(tasks.innerHTML != '' || tasks.innerHTML == null) {
    if(confirm('Are You Sure You Want to Delete All Tasks \n(This can\'t be Undone!)?')) {
      tasks.innerHTML = '';
    }
  }
}
