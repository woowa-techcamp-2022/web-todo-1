import { qs, emit } from "../util";
import Store from "../util/Store";
import Component from "./Component";

export default class Modal extends Component {
  constructor(container, { columnId, taskId }) {
    super(container);

    const initialState = {
      isOpen: false,
    };

    this.taskId = taskId;
    this.columnId = columnId;
    this.store = new Store(initialState);
    this.bindEvents();
  }

  bindEvents() {
    this.on("click", this.closeModal.bind(this));
  }

  closeModal({ target }) {
    const { columnId, taskId } = this;
    if (target.classList.contains("modal-wrapper")) {
      this.container.remove();
    }
    if (target.dataset.action === "cancel") {
      this.container.remove();
    }

    if (target.dataset.action === "delete") {
      emit(this.container, "@deleteTask", { columnId, taskId });
      this.container.remove();
    }
  }

  submitNewCard(event) {
    event.preventDefault();
    const { title, body } = this.store.state;

    if (!(title && body)) {
      return;
    }

    const task = { title, body, author: "교영", columnId: this.columnId };
    emit(this.container, "@newTask", task);
  }

  handleActiveButton(target) {
    if (target.tagName === "TEXTAREA" || target.tagName === "INPUT") {
      if (this.store.state.body && this.store.state.title) {
        const registerBtn = qs("[data-action='register']", this.container);
        registerBtn.classList.replace("normal", "accent");
      }
    }
  }

  render() {
    const { taskId } = this.store.state;
    const modalHTML = this.template.getModal({ taskId });
    this.container.innerHTML = modalHTML;
  }
}
