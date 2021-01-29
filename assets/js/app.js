// global selectors
const appContainer = document.querySelector(".app-container");
const header = document.querySelector('header');
const menuOverlay = document.querySelector('.menu > .overlay');

const hambMenu = document.querySelector('.hamburger-menu');
const reset = document.querySelector('.reset > .action-btn');
const welcomingPhrase = document.querySelector('#welcomePhrase');

const tasks = document.querySelector(".tasks");
const addBtn = document.querySelector(".add-btn");
const inputTask = document.getElementById("task-input");

const footer = document.querySelector('.app-container > footer');


/* 
  html decimal code for smiley faces from:
  https://www.w3schools.com/charsets/ref_emoji_smileys.asp
*/

// Header
const headBgImgs = ['bg-1','bg-2','bg-3','bg-4','bg-5'];
const welcomingPhrasesEn = [
  'plan your day &#128513;', // 😁
  'you got this	&#128170; &#128521;', // 💪😉
  'what are you doing today? &#129300;', // 🤔
  'you can accomplish anything! &#128515;' // 😃
];

function changeBgAndWelcoming(bgImg = true, welcoming = true) {
  // change bgImgs
  if(bgImg == true) {
    const randomBgImgIndex = Math.floor(Math.random() * headBgImgs.length);
    header.style.backgroundImage = `url(assets/imgs/bg-${randomBgImgIndex + 1}.jpg)`;
  } else {
    header.style.backgroundImage = `url(assets/imgs/${headBgImgs[1]}.jpg`; // second img
  }
  // welcomingPhrasesEn
  if (welcoming == true) {
    const randomPhraseIndex = Math.floor(Math.random() * welcomingPhrasesEn.length);
    welcomingPhrase.innerHTML = welcomingPhrasesEn[randomPhraseIndex];
  } else {
    welcomingPhrase.innerHTML = welcomingPhrasesEn[0];
  }
}
// calling the function changeBgAndWelcoming
changeBgAndWelcoming();


// Main EventListener for the App
appContainer.addEventListener("click", makeAction);

// Main Function
function makeAction(e) {
  e.preventDefault();
  const targetElem = e.target;
  
  if(targetElem === reset) { clearTasks() }
  
  if(targetElem === addBtn) { addTask() }
  
  if(targetElem === hambMenu) { toggleMenu() }
  
  if (targetElem !== hambMenu) { closeMenu() }
  
  if(targetElem.classList.contains('trash-icon')) {
    targetElem.parentNode.parentNode.remove();
  }
  

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

/* === close menu === */
const closeMenu = () => {
  hambMenu.classList.remove('active');
  menuOverlay.classList.remove('active');
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
      <!-- edit icon -->
      <svg class="edit-icon action-btn" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0)">
          <path
            d="M12.3896 25C12.2531 25 12.1198 24.9458 12.0208 24.8479C11.8979 24.725 11.8437 24.5479 11.8781 24.3781L12.6146 20.6958C12.6354 20.5937 12.6833 20.501 12.7573 20.4291L20.8594 12.327C21.4677 11.7187 22.4604 11.7187 23.0688 12.327L24.5417 13.8C25.1511 14.4093 25.1511 15.4 24.5417 16.0093L16.4396 24.1114C16.3677 24.1843 16.275 24.2333 16.1729 24.2541L12.4906 24.9906C12.4573 24.9968 12.4229 25 12.3896 25ZM13.6063 21.0531L13.0542 23.8145L15.8156 23.2625L23.8063 15.2718C24.0094 15.0687 24.0094 14.7385 23.8063 14.5354L22.3333 13.0625C22.1302 12.8593 21.8 12.8593 21.5969 13.0625L13.6063 21.0531ZM16.0719 23.7427H16.0823H16.0719Z"
            fill="#D2D2D2" />
          <path
            d="M9.89583 21.875H2.60416C1.1677 21.875 -7.62939e-06 20.7073 -7.62939e-06 19.2708V5.72917C-7.62939e-06 4.29271 1.1677 3.125 2.60416 3.125H4.68749C4.97499 3.125 5.20833 3.35833 5.20833 3.64583C5.20833 3.93333 4.97499 4.16667 4.68749 4.16667H2.60416C1.7427 4.16667 1.04166 4.86771 1.04166 5.72917V19.2708C1.04166 20.1323 1.7427 20.8333 2.60416 20.8333H9.89583C10.1833 20.8333 10.4167 21.0667 10.4167 21.3542C10.4167 21.6417 10.1833 21.875 9.89583 21.875Z"
            fill="#D2D2D2" />
          <path
            d="M17.1875 12.5C16.9 12.5 16.6667 12.2667 16.6667 11.9792V5.72917C16.6667 4.86771 15.9656 4.16667 15.1042 4.16667H13.0208C12.7333 4.16667 12.5 3.93333 12.5 3.64583C12.5 3.35833 12.7333 3.125 13.0208 3.125H15.1042C16.5406 3.125 17.7083 4.29271 17.7083 5.72917V11.9792C17.7083 12.2667 17.475 12.5 17.1875 12.5Z"
            fill="#D2D2D2" />
          <path
            d="M11.9792 6.25H5.72917C4.86771 6.25 4.16667 5.54896 4.16667 4.6875V2.60417C4.16667 2.31667 4.4 2.08333 4.6875 2.08333H6.30209C6.54375 0.895833 7.59688 0 8.85417 0C10.1115 0 11.1646 0.895833 11.4063 2.08333H13.0208C13.3083 2.08333 13.5417 2.31667 13.5417 2.60417V4.6875C13.5417 5.54896 12.8406 6.25 11.9792 6.25ZM5.20834 3.125V4.6875C5.20834 4.97396 5.44271 5.20833 5.72917 5.20833H11.9792C12.2656 5.20833 12.5 4.97396 12.5 4.6875V3.125H10.9375C10.65 3.125 10.4167 2.89167 10.4167 2.60417C10.4167 1.74271 9.71563 1.04167 8.85417 1.04167C7.99271 1.04167 7.29167 1.74271 7.29167 2.60417C7.29167 2.89167 7.05834 3.125 6.77084 3.125H5.20834Z"
            fill="#D2D2D2" />
          <path
            d="M14.0625 9.37504H3.64583C3.35833 9.37504 3.12499 9.14171 3.12499 8.85421C3.12499 8.56671 3.35833 8.33337 3.64583 8.33337H14.0625C14.35 8.33337 14.5833 8.56671 14.5833 8.85421C14.5833 9.14171 14.35 9.37504 14.0625 9.37504Z"
            fill="#D2D2D2" />
          <path
            d="M14.0625 12.5H3.64583C3.35833 12.5 3.12499 12.2667 3.12499 11.9792C3.12499 11.6916 3.35833 11.4583 3.64583 11.4583H14.0625C14.35 11.4583 14.5833 11.6916 14.5833 11.9792C14.5833 12.2667 14.35 12.5 14.0625 12.5Z"
            fill="#D2D2D2" />
          <path
            d="M14.0625 15.625H3.64583C3.35833 15.625 3.12499 15.3917 3.12499 15.1042C3.12499 14.8167 3.35833 14.5834 3.64583 14.5834H14.0625C14.35 14.5834 14.5833 14.8167 14.5833 15.1042C14.5833 15.3917 14.35 15.625 14.0625 15.625Z"
            fill="#D2D2D2" />
        </g>
        <defs>
          <clipPath id="clip0">
            <rect width="25" height="25" fill="white" />
          </clipPath>
        </defs>
      </svg>

      <!-- pin icon -->
      <svg class="pin-icon action-btn" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0)">
          <path
            d="M17.054 0.199995C16.879 0.299995 15.804 1.725 14.629 3.375L12.504 6.35L11.104 6.275C10.354 6.25 9.12896 6.4 8.40396 6.6C6.82896 7.05 4.97896 8.325 4.97896 8.95C4.97896 9.5 15.479 20 16.054 20C16.654 20 17.929 18.15 18.379 16.575C18.579 15.85 18.729 14.6 18.704 13.8L18.629 12.375L21.729 10.25C26.054 7.3 26.054 7.45 21.804 3.2C18.629 -3.8147e-06 17.979 -0.400005 17.054 0.199995Z"
            fill="#D2D2D2" />
          <path
            d="M4.15 18.8C-1.9 26.475 -1.525 26.925 6.025 20.975C8.825 18.75 11.175 16.9 11.225 16.85C11.35 16.725 8.475 13.75 8.25 13.75C8.175 13.75 6.325 16.025 4.15 18.8Z"
            fill="#D2D2D2" />
        </g>
        <defs>
          <clipPath id="clip0">
            <rect width="25" height="25" fill="white" />
          </clipPath>
        </defs>
      </svg>

      <!-- trash icon -->
      <svg class="trash-icon action-btn" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0)">
          <path
            d="M15.9484 9.05756C15.625 9.05756 15.3629 9.31965 15.3629 9.64304V20.7086C15.3629 21.0318 15.625 21.2941 15.9484 21.2941C16.2718 21.2941 16.5339 21.0318 16.5339 20.7086V9.64304C16.5339 9.31965 16.2718 9.05756 15.9484 9.05756Z"
            fill="#D2D2D2" />
          <path
            d="M9.03973 9.05756C8.71635 9.05756 8.45425 9.31965 8.45425 9.64304V20.7086C8.45425 21.0318 8.71635 21.2941 9.03973 21.2941C9.36312 21.2941 9.62521 21.0318 9.62521 20.7086V9.64304C9.62521 9.31965 9.36312 9.05756 9.03973 9.05756Z"
            fill="#D2D2D2" />
          <path
            d="M4.00462 7.44268V21.8676C4.00462 22.7202 4.31726 23.5209 4.8634 24.0954C5.40702 24.6715 6.16357 24.9986 6.95534 24.9999H18.0328C18.8248 24.9986 19.5813 24.6715 20.1247 24.0954C20.6708 23.5209 20.9835 22.7202 20.9835 21.8676V7.44268C22.0691 7.15452 22.7726 6.10569 22.6274 4.99168C22.4819 3.8779 21.5331 3.04473 20.4097 3.0445H17.4121V2.31266C17.4155 1.69722 17.1722 1.10625 16.7365 0.671486C16.3008 0.236952 15.7089 -0.00501556 15.0935 1.58919e-05H9.89462C9.27918 -0.00501556 8.6873 0.236952 8.25162 0.671486C7.81594 1.10625 7.57261 1.69722 7.57604 2.31266V3.0445H4.57843C3.45505 3.04473 2.50616 3.8779 2.36071 4.99168C2.21548 6.10569 2.91897 7.15452 4.00462 7.44268V7.44268ZM18.0328 23.829H6.95534C5.95431 23.829 5.17558 22.9691 5.17558 21.8676V7.49414H19.8125V21.8676C19.8125 22.9691 19.0338 23.829 18.0328 23.829ZM8.74699 2.31266C8.7431 2.0078 8.86294 1.71437 9.0793 1.49916C9.29542 1.28395 9.58953 1.16571 9.89462 1.17097H15.0935C15.3986 1.16571 15.6927 1.28395 15.9088 1.49916C16.1252 1.71414 16.245 2.0078 16.2411 2.31266V3.0445H8.74699V2.31266ZM4.57843 4.21546H20.4097C20.9917 4.21546 21.4635 4.68727 21.4635 5.26932C21.4635 5.85137 20.9917 6.32318 20.4097 6.32318H4.57843C3.99639 6.32318 3.52457 5.85137 3.52457 5.26932C3.52457 4.68727 3.99639 4.21546 4.57843 4.21546V4.21546Z"
            fill="#D2D2D2" />
          <path
            d="M12.4941 9.05756C12.1707 9.05756 11.9086 9.31965 11.9086 9.64304V20.7086C11.9086 21.0318 12.1707 21.2941 12.4941 21.2941C12.8174 21.2941 13.0795 21.0318 13.0795 20.7086V9.64304C13.0795 9.31965 12.8174 9.05756 12.4941 9.05756Z"
            fill="#D2D2D2" />
        </g>
        <defs>
          <clipPath id="clip0">
            <rect width="25" height="25" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  </li>`;

  tasks.insertAdjacentHTML("beforeend", taskTemplate);
  inputTask.value = "";
  // set foucs again for task input element
  inputTask.focus();
}


/* === clear all list === */
const clearTasks = () => {
  if(tasks.innerHTML != '' || tasks.innerHTML == null) {
    if(confirm('Are You Sure You Want to Delete All Tasks \n(This can\'t be Undone!)?')) {
      tasks.innerHTML = '';
    }
  }
}
