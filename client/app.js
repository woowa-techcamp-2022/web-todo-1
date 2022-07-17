import "./reset.css";
import "./style.css";
import { qs } from "./util";
import TodoList from "./components/TodoList";
import TodoAPI from "./service/TodoAPI";
import History from "./components/History";

const getHistory = () => {
  const requestOption = {};
  try {
    return fetch("/history", requestOption)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return new Error("it is not 200~299 status");
      })
      .then((result) => result);
  } catch (error) {
    throw new Error(error);
  }
};

function App() {
  const todoListContainer = qs(".todo-list-wrapper");
  const historyContainer = qs(".history");

  const history = new History(historyContainer);
  TodoAPI.getTodoList().then(
    (todoList) => new TodoList(todoListContainer, { todoList })
  );

  const menuBtn = document.querySelector(".menu");
  const drawer = document.querySelector(".drawer");
  const closeBtn = document.querySelector(".close-btn");

  menuBtn.addEventListener("click", () => {
    drawer.classList.toggle("open");
    drawer.style.transition = "ease-in 0.3s transform";
    getHistory().then((result) => {
      history.render(result);
    });
  });

  closeBtn.addEventListener("click", () => {
    drawer.classList.remove("open");
  });
}

const app = new App();
