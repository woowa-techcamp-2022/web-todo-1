import { qs, emit } from "../util";
import Store from "../util/Store";
import Component from "./Component";
import { textareaHeightChange } from "../util/handler";

export default class CardInput extends Component {
  constructor(container, { columnId }) {
    super(container);

    const initialState = {
      title: "",
      body: "",
    };

    this.columnId = columnId;
    this.store = new Store(initialState);
    this.bindEvents();
  }

  bindEvents() {
    this.on("input", ({ target }) => {
      this.store.setState(target.name, target.value);
      textareaHeightChange(target);
      this.handleActiveButton(target);
    }).on("submit", this.submitNewCard.bind(this));
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
    const { title, body } = this.store.state;
    const cardHTML = this.template.getCardInput({ title, body });
    this.container.innerHTML = cardHTML;
  }
}
