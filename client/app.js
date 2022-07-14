import "./reset.css";
import "./style.css";
import { qs } from "./util";
import TodoList from "./components/TodoList";

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

  fetch("/todo")
    .then((result) => result.json())
    .then((result) => {
      console.log(result);
      const todoList = result;
      const todoListComponent = new TodoList(todoListContainer, { todoList });
    });

  // todoList 인스턴스를 만들어서 초기화
  // actionStack 인스턴스를 만들고 초기화
}

const app = new App();
