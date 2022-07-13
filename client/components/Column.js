import Component from "./Component";
import Template from "./Template";
import Card from "./Card";
import { qs, on } from "../util";
import Store from "../util/Store";
import CardInput from "./CardInput";

export default class Column extends Component {
  constructor(container, { columnName, columnID, todoList }) {
    super(container);
    this.store = new Store({ isOpen: false }, this.render.bind(this));
    this.todoList = todoList;
    this.columnName = columnName;
    this.columnID = columnID;
    this.template = new Template();

    const { tasks } = todoList[this.columnID];
    this.tasks = tasks;
    this.cardComponents = this.getCardComponents();

    const cardInputContainer = document.createElement("form");
    cardInputContainer.className = "card active";

    this.cardInput = new CardInput(cardInputContainer);
    this.bindEvents();
  }

  bindEvents() {
    on(this.container, "click", ({ target }) => {
      if (!target.closest(".btn-plus-icon")) {
        return;
      }

      this.store.setState("isOpen", !this.store.state.isOpen);
    });

    on(this.container, "keyup", ({ target }) => {});
  }

  getCardComponents() {
    const cardComponents = [];

    this.tasks.forEach((task) => {
      const cardContainer = document.createElement("div");
      cardContainer.dataset.taskId = task.id;
      cardContainer.classList.add("card");
      const card = new Card(cardContainer, { ...task });
      cardComponents.push(card);
    });

    return cardComponents;
  }

  render() {
    const { tasks } = this.todoList[this.columnID];
    const { isOpen } = this.store.state;

    if (isOpen) {
      this.cardInput.render();
    } else {
      this.cardInput.store.setState("title", "");
      this.cardInput.store.setState("body", "");
    }
    this.container.innerHTML = this.template.getColumnHeader({
      columnName: this.columnName,
      tasks,
    });

    const cardWrapper = document.createElement("div");
    if (isOpen) {
      cardWrapper.appendChild(this.cardInput.container);
      this.cardInput.render();
    }
    cardWrapper.classList.add("card-wrapper");
    this.container.appendChild(cardWrapper);

    this.cardComponents.forEach((card) => {
      cardWrapper.appendChild(card.container);
      card.render();
    });
  }
}
