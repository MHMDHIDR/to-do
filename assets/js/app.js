// Selectors
const restBtn = document.querySelector(".fa-redo");
const tasks = document.querySelector(".tasks");
const appContainer = document.querySelector(".app-container");
const addBtn = document.querySelector(".add-btn");
const inputTask = document.getElementById("task-input");
const welcomePhrase = document.querySelector('#welcomePhrase');

// Classes
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle";
const DONE = "line-through";

// show welcomePhrases Randomly
const welcomePhrasesEn = ['plan the day', 'you got this ;)', 'how are you doing today? :)', 'you can accomplish anything! :D']

welcomePhrasesEn.forEach(phrase => {
  welcomePhrase.innerText = phrase;
})


const heroElem = document.querySelector('.hero-bg');

if(heroElem !== null) { // if hero element exists then change bg image
  const heroBg = ['1.png', '2.png', '3.png', '4.png', '5.png'];
  const heroBgPath = "wp-content/themes/aae_qtr/assets/img/hero-bgs/";

  heroElem.style.background = "#ccc url('"+heroBgPath+heroBg[Math.floor(Math.random() * heroBg.length)]+"') center / cover no-repeat fixed";
}

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
  // make an action based on the target
  const targetElem = e.target;
  
  const reset = document.querySelector('.reset > .action-btn');

  const hambCheck = document.querySelector('.hamburger-menu > input[type="checkbox"]');
  const menuOverlay = document.querySelector('.menu > .overlay');
  
  const footer = document.querySelector('.app-container > footer');
  

  if (targetElem == reset) { // clear all list
    if(!confirm('Are You Sure You Want to Delete All Tasks (This can\'t be Undone!)?')) return;
    tasks.innerHTML = '';
  } else if(targetElem == hambCheck) {
    menuOverlay.classList.toggle('show');
    tasks.classList.toggle('pointerEveNone');
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
