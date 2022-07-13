import { on, emit } from "../util";

export default class View {
  constructor(element) {
    this.element = element;
  }

  on(eventName, handler) {
    on(this.element, eventName, handler);
  }

  emit(eventName, data) {
    emit(this.element, eventName, data);
  }
}
