import { removeCard, shiftCard } from "../service/TodoService";
import Store from "../util/Store";
import Column from "./Column";
import Component from "./Component";
import { data } from "./mockdata";
import Modal from "./Modal";
import { createElementWithClass, isBefore, qs } from "../util";

const MARGIN = 16;

export default class TodoList extends Component {
  constructor(container, props) {
    super(container, props);

    const initialState = {
      todoList: data,
    };

    // 상태 저장소 setState를 할 때마다 새로 랜더링한다.
    this.store = new Store(initialState, this.render.bind(this));
    this.isModalOpen = false;
    this.columnComponents = this.getColumComponents();
    this.clicked = false;
    this.grabbedCard = qs(".grab-card", document);
    this.cloneCard = null;
    this.originCard = null;
    this.init();
    this.bindEvents();
  }

  bindEvents() {
    this.on("@newTask", this.addNewCard.bind(this))
      .on("@openModal", this.openModal.bind(this))
      .on("@deleteTask", this.deleteCard.bind(this));

    window.addEventListener("pointerdown", this.grabCard.bind(this));
    window.addEventListener("pointermove", this.grabCardMove.bind(this));
    window.addEventListener("pointerup", this.grabCardDrop.bind(this));
  }

  grabCardDrop() {
    if (!this.clicked) {
      return;
    }

    this.clicked = false;
    if (this.originCard) {
      this.originCard.classList.remove("place");
    }
    if (this.cloneCard) {
      this.cloneCard.remove();
    }

    this.cloneCard = null;
    this.originCard = null;
  }

  grabCardMove({ pageX, pageY }) {
    if (!this.clicked && !this.cloneCard) {
      return;
    }

    this.grabbedCard.hidden = true;
    let elemBelow = document.elementFromPoint(pageX, pageY);
    if (elemBelow && elemBelow.classList.contains("card-wrapper")) {
      elemBelow = document.elementFromPoint(pageX, pageY + MARGIN);
    }
    const closestCard = elemBelow.closest(".card");
    const cardWrapper = elemBelow.closest(".card-wrapper");
    this.grabbedCard.hidden = false;

    this.grabbedCard.style.transform = `translateX(${
      pageX - this.grabbedCard.offsetWidth / 2
    }px) translateY(${pageY - this.grabbedCard.offsetHeight / 2}px)`;

    if (!closestCard) {
      if (cardWrapper) {
        const start = qs(".start", cardWrapper);

        const { top } = start.getBoundingClientRect();

        // start보다 현재 커서가 밑에 있으면
        if (top > pageY) {
          start.parentNode.insertBefore(
            this.originCard,
            start.nextElementSibling
          );
        } else {
          cardWrapper.appendChild(this.originCard);
        }
      }

      return;
    }

    if (
      isBefore(this.originCard, closestCard) &&
      closestCard.className !== "start"
    ) {
      if (closestCard.classList.contains("active")) {
        return;
      }
      closestCard.parentNode.insertBefore(this.originCard, closestCard);
    } else if (closestCard.parentNode) {
      closestCard.parentNode.insertBefore(
        this.originCard,
        closestCard.nextSibling
      );
    }
  }

  grabCard({ button, target, pageX, pageY }) {
    if (target.closest(".btn-delete-icon")) {
      return;
    }

    if (target.closest(".card.active")) {
      return;
    }

    if (button !== 0) {
      return;
    }

    const card = target.closest(".card");
    this.originCard = card;

    if (!card) {
      return;
    }

    this.clicked = true;
    const cloneCard = card.cloneNode(true);
    card.classList.add("place");
    this.cloneCard = cloneCard;
    cloneCard.classList.add("drag");
    this.grabbedCard.appendChild(cloneCard);

    this.grabbedCard.style.transform = `translateX(${
      pageX - this.grabbedCard.offsetWidth / 2
    }px) translateY(${pageY - this.grabbedCard.offsetHeight / 2}px)`;
  }

  openModal({ detail: { columnId, taskId } }) {
    const container = createElementWithClass("div", "modal-wrapper");
    this.container.appendChild(container);
    const modal = new Modal(container, { columnId, taskId });
    modal.render();
  }

  deleteCard({ detail: { columnId, taskId } }) {
    const { todoList } = this.store.state;
    const column = todoList[columnId];
    const { name, tasks } = column;
    const newTasks = removeCard(taskId, tasks);
    const newValue = {
      ...todoList,
      [columnId]: { name, tasks: newTasks },
    };
    this.store.setState("todoList", newValue);
  }

  addNewCard({ detail }) {
    const { todoList } = this.store.state;
    const { columnId, ...card } = detail;
    const column = todoList[columnId];
    const { name, tasks } = column;

    const newTasks = shiftCard({ ...card, id: 2 }, tasks);

    const newValue = {
      ...todoList,
      [columnId]: { name, tasks: newTasks },
    };

    this.store.setState("todoList", newValue);
  }

  getColumComponents() {
    const columnComponents = [];
    const { todoList } = this.store.state;

    Object.keys(todoList).forEach((columnId) => {
      const container = document.createElement("div");
      this.container.appendChild(container);
      container.dataset.columnId = columnId;
      container.classList.add("column");
      // column id는 database에 있는 foreign 키로 사용되는 id이다.

      // todoKey는 한일,끝마친 일, 이런 식으로 들어간다.
      const newColumn = new Column(container, {
        columnId,
        columnName: todoList[columnId].name,
        todoList,
      });

      columnComponents.push(newColumn);
    });

    return columnComponents;
  }

  render() {
    const { todoList } = this.store.state;
    this.columnComponents.forEach((columnComponent) => {
      columnComponent.render(todoList);
    });
  }

  init() {
    // DB에서
    this.render();
  }
}
