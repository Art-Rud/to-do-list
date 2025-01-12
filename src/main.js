import * as basicLightbox from "basiclightbox";
import "basiclightbox/dist/basicLightbox.min.css";
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
};

if (storageData !== null) onReloadPage();

const changeStatus = (e) => {
  if (e.target.nodeName !== "LI") return;
  if (e.target.classList.contains("todo")) {
    e.target.classList.replace("todo", "complete");
    e.target.lastElementChild.remove();
    e.target.insertAdjacentHTML("beforeend", buttonDelete);
  } else {
    e.target.classList.replace("complete", "todo");
    e.target.lastElementChild.remove();
    e.target.insertAdjacentHTML("beforeend", buttonUpdate);
  }

  const data = JSON.parse(localStorage.getItem("todo"));
  const updatedData = data.map((item) => {
    if (item.id === +e.target.id) {
      item.status = e.target.classList[0];
    }
    return item;
  });
  localStorage.setItem("todo", JSON.stringify(updatedData));
};
list.addEventListener("click", changeStatus);

const removeIteam = (e) => {
  if (!e.target.classList.contains("btn-delete")) return;

  e.target.parentNode.remove();

  const dataLS = JSON.parse(localStorage.getItem("todo"));
  const deleteIteam = dataLS.filter(
    (iteam) => iteam.id !== +e.target.parentNode.id
  );

  localStorage.setItem("todo", JSON.stringify(deleteIteam));
};

list.addEventListener("click", removeIteam);

const editTask = (e) => {
  if (!e.target.classList.contains("btn-update")) return;

  const taskId = +e.target.parentNode.id;
  const data = JSON.parse(localStorage.getItem("todo"));
  const taskEdit = data.find((task) => task.id === taskId);

  console.log(taskEdit);

  const instance = basicLightbox.create(
    `<div class="modal-container"><button type="button" class="btn-close-modal">X</button><input type="text" class="input-modal" value="${taskEdit.text}"/><button type="button" class="btn-update-modal" id="${e.target.parentNode.id}">Update todo</button></div>`,
    {
      closable: false,
    }
  );

  instance.show();

  const instansModal = instance.element();
  instansModal
    .querySelector(".btn-close-modal")
    .addEventListener("click", () => {
      instance.close();
    });

  instansModal
    .querySelector(".btn-update-modal")
    .addEventListener("click", () => {
      const rebornTask = instansModal
        .querySelector(".input-modal")
        .value.trim();

      if (rebornTask === "") {
        alert("Завдання не може бути пустим");
        return;
      }
      if (rebornTask === taskEdit.text) {
        alert("Завдання не змінене");
        return;
      }

      const rebornTaskInData = data.map((task) => {
        if (task.id === taskId) {
          task.text = rebornTask;
        }
        return task;
      });
      localStorage.setItem("todo", JSON.stringify(rebornTaskInData));

      const taskIteam = document.getElementById(taskId);
      taskIteam.firstChild.textContent = rebornTask;

      instance.close();
    });
};

list.addEventListener("click", editTask);

//  модальне вікно

/*instance = basicLightbox.create(
    `<div class="modal-container"><button type="button" class="btn-close-modal">X</button><input type="text" class="input-modal"/><button type="button" class="btn-update-modal" id="${e.target.parentNode.id}">Update todo</button></div>`,
    {
      closable: false,
    }
  );*/
