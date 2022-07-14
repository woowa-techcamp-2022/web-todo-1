import Component from "./Component";
import Card from "./Card";
import { createElementWithClass } from "../util";
import Store from "../util/Store";
import CardInput from "./CardInput";

/**
 * props : columnName, columnId, todoList
 */
export default class Column extends Component {
  constructor(container, props) {
    super(container, props);
    this.store = new Store({ isOpen: false }, this.render.bind(this));
    this.todoList = props.todoList;

    // children binding
    const cardInputContainer = createElementWithClass("form", "card active");
    this.cardInput = new CardInput(cardInputContainer, {
      columnId: props.columnId,
    });

    // bind Events
    this.bindEvents();
  }

  bindEvents() {
    this.on("click", ({ target }) => {
      if (!target.closest(".btn-plus-icon")) {
        return;
      }

      this.store.setState("isOpen", !this.store.state.isOpen);
    })
      .on("@newTask", () => {
        this.store.setState("isOpen", false);
      })
      .on("click", ({ target }) => {
        if (target.dataset.action === "cancle") {
          this.store.setState("isOpen", false);
        }
      });
  }

  getCardComponents() {
    const cardComponents = [];

    this.tasks.forEach((task) => {
      const cardContainer = createElementWithClass("div", "card");
      cardContainer.dataset.taskId = task.id;
      const card = new Card(cardContainer, { ...task });
      cardComponents.push(card);
    });

    return cardComponents;
  }

  render(todoList) {
    const { columnId, columnName } = this.props;

    // 첫 랜더시에
    if (todoList) {
      this.todoList = todoList;
    }

    const { tasks } = this.todoList[columnId];
    const { isOpen } = this.store.state;
    this.tasks = tasks;

    if (isOpen) {
      this.cardInput.render();
    } else {
      this.cardInput.store.setState("title", "");
      this.cardInput.store.setState("body", "");
    }

    this.container.innerHTML = this.template.getColumnHeader({
      columnName,
      tasks,
    });

    const cardWrapper = createElementWithClass("div", "card-wrapper");
    this.container.appendChild(cardWrapper);

    if (isOpen) {
      cardWrapper.appendChild(this.cardInput.container);
      this.cardInput.render();
    }

    this.cardComponents = this.getCardComponents();
    this.cardComponents.forEach((card) => {
      cardWrapper.appendChild(card.container);
      card.render();
    });
  }
}
