import { on, qs } from "../util";
import Template from "./Template";
import View from "./View";
export default class TodoListView extends View {
  constructor(selector, todoListIds) {
    super(qs(selector));
    this.todoListIds = todoListIds;
    this.template = new Template();
    this.bindEvnets();
  }

  bindEvnets() {
    on(this.element, "click", ({ target }) => {
      // console.log(target);
      // 가장 가까운 column을 찾고
      if (!target.closest(".btn-plus-icon")) {
        return;
      }
      const column = target.closest(".column");
      const cardWrapper = qs(".card-wrapper", column);
      cardWrapper.insertAdjacentHTML(
        "afterbegin",
        this.template.getCardInput()
      );
      const textArea = qs("textarea", cardWrapper);
      on(textArea, "keyup", ({ target }) => {
        target.style.height = target.scrollHeight + "px";
      });

      console.log(cardWrapper);
      // 그 자식 .card-wrapper에서 첫번째 자식 card
    });
  }

  render(data) {
    this.element.innerHTML = this.template.getColumns(this.todoListIds, data);
  }
}
