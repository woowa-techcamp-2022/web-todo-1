import Component from "./Component";
import Card from "./Card";
import { createElementWithClass, emit } from "../util";
import { activateDeleteCard, deactivateDeleteCard } from "../util/handler";
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
    // column header의 추가 버튼
    this.on("click", this.toggleCardInput.bind(this))
      .on("click", this.openModal.bind(this))
      .on("mouseover", activateDeleteCard)
      .on("mousemove", deactivateDeleteCard)
      .on("@newTask", this.setIsModal.bind(this));
  }

  openModal({ target }) {
    // card의 삭제 버튼
    if (target.closest(".btn-delete-icon")) {
      const card = target.closest(".card");
      const { columnId } = this.props;
      const { taskId } = card.dataset;
      card.classList.remove("delete");
      emit(this.container, "@openModal", { columnId, taskId });
    }
  }

  setIsModal() {
    this.store.setState("isOpen", !this.store.state.isOpen);
  }

  toggleCardInput({ target }) {
    if (!target.closest("[data-action='toggleInput'")) {
      return;
    }
    this.setIsModal();
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
    const dragStartContiner = createElementWithClass("div", "start");
    cardWrapper.appendChild(dragStartContiner);
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
