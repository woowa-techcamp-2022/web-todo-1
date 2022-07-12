import "./reset.css";
import "./style.css";

import TodoListStore from "./model/TodoListStore";
import TodoListView from "./views/TodoListView";
import Controller from "./controller";

const menuBtn = document.querySelector(".menu");
const drawer = document.querySelector(".drawer");
const closeBtn = document.querySelector(".close-btn");

menuBtn.addEventListener("click", () => {
  drawer.classList.toggle("open");
  drawer.style.transition = "ease-in 0.3s transform";
});

closeBtn.addEventListener("click", () => {
  drawer.classList.remove("open");
});

window.addEventListener("DOMContentLoaded", () => {
  const todoListIds = [
    { name: "해야할 일", key: "todo" },
    { name: "진행중인 일", key: "inProgress" },
    { name: "한 일", key: "done" },
  ];

  const todoListView = new TodoListView(".todo-list-wrapper", todoListIds);
  const todoListStore = new TodoListStore(todoListIds);

  const controller = new Controller({ todoListStore }, { todoListView });
});
