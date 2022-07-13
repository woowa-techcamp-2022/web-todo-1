import { qs, on } from "../util";
import Store from "../util/Store";
import Component from "./Component";
import Template from "./Template";

export default class CardInput extends Component {
  constructor(container, task) {
    super(container);
    this.template = new Template();

    const initialState = {
      title: "",
      body: "",
    };

    this.store = new Store(initialState);
    this.bindEvents();
  }

  bindEvents() {
    on(this.container, "input", ({ target }) => {
      this.store.setState(target.name, target.value);

      if (target.tagName === "TEXTAREA") {
        target.style.height = target.scrollHeight + "px";
      }

      if (target.tagName === "TEXTAREA" || target.tagName === "INPUT") {
        if (this.store.state.body && this.store.state.title) {
          const registerBtn = qs("[data-action='register']", this.container);
          registerBtn.classList.replace("normal", "accent");
        }
      }
    });
  }
  render() {
    const { title, body } = this.store.state;
    const cardHTML = this.template.getCardInput({ title, body });
    this.container.innerHTML = cardHTML;
  }
}
