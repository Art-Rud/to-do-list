import * as basicLightbox from "basiclightbox";
// import "basiclightbox/dist/basicLightbox.min.css";
export const buttonUpdate =
  '<button type="button" class="btn-update" ></button>';
export const buttonDelete =
  '<button type="button" class="btn-delete" >del</button> </div>';
const input = document.querySelector(".input-js");
const btn = document.querySelector(".btn-add");
const list = document.querySelector(".todo-list");
const storageData = JSON.parse(localStorage.getItem("todo"));
const createToDo = () => {
  if (input.value.trim() === "") {
    return;
  }
  const arr = JSON.parse(localStorage.getItem("todo")) || [];
  const newToDo = {
    id: Date.now(),
    status: "todo",
    text: input.value,
  };
  arr.push(newToDo);
  localStorage.setItem("todo", JSON.stringify(arr));
  list.appendChild(createItem(newToDo));
  input.value = "";
};
const createItem = (todo) => {
  const itemBtn = todo.status === "todo" ? buttonUpdate : buttonDelete;
  const newItem = document.createElement("li");
  newItem.classList.add(todo.status);
  newItem.id = todo.id;
  newItem.textContent = todo.text;
  newItem.insertAdjacentHTML("beforeend", itemBtn);
  return newItem;
};
btn.addEventListener("click", createToDo);

const onReloadPage = () => {
  const markUp = storageData.map(createItem);
  list.append(...markUp);
}

if (storageData !== null) onReloadPage();

const changeStatus = (e) => {
  if (e.target.nodeName !== 'LI') return;
  if (e.target.classList.contains('todo')) {
    e.target.classList.replace('todo', 'complete');
    e.target.lastElementChild.remove();
    e.target.insertAdjacentHTML('beforeend', buttonDelete);
  } else {
    e.target.classList.replace('complete', 'todo');
    e.target.lastElementChild.remove();
    e.target.insertAdjacentHTML('beforeend', buttonUpdate);
  }
  
  const data = JSON.parse(localStorage.getItem("todo"));
  const updatedData = data.map(item => {
    if (item.id === +e.target.id){
      item.status = e.target.classList[0];
    }
    return item;
  });
  localStorage.setItem('todo', JSON.stringify(updatedData));
}
list.addEventListener('click', changeStatus);
