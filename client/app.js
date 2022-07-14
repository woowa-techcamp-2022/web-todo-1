import "./reset.css";
import "./style.css";
import { qs } from "./util";
import TodoList from "./components/TodoList";
import TodoAPI from "./service/TodoAPI";

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

function App() {
  const todoListContainer = qs(".todo-list-wrapper");
  const actionStackContainer = qs(".action-stack");

  TodoAPI.getTodoList().then(
    (todoList) => new TodoList(todoListContainer, { todoList })
  );
}

const app = new App();
