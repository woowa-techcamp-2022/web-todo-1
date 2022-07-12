import { qs } from "../util";
import Template from "./Template";
import View from "./View";

export default class TodoListView extends View {
  constructor(selector, todoListIds) {
    super(qs(selector));
    this.todoListIds = todoListIds;
    this.template = new Template();
    // this.element.innerHTML = this.template.getColumns(todoListIds);
  }

  render(data) {
    this.element.innerHTML = this.template.getColumns(this.todoListIds, data);
  }
}
