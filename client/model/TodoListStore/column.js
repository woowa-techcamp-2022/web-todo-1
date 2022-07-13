import Task from "../../Task";

export default class Column {
  constructor({ name, key }) {
    this.title = name;
    this.tasks = [];
    this.init();
  }

  init() {
    // DB에서 key값을 이용해 카드 리스트를 가져온다.
    // title로는 Todo, In progress, Done이 있다.
    const task1 = new Task("Github 공부하기", "- commit, push, add", "연정");
    const task2 = new Task("MVC 공부하기", "- commit, push, add", "교영");
    this.tasks = [task1, task2];
  }

  removeCard(id) {
    this.tasks = this.tasks.filter((card) => card.id !== id);
  }

  insertCard(card, idx) {
    // eslint-disable-next-line no-param-reassign
    idx = idx || this.tasks.length;
    this.tasks = [...this.tasks.slice(0, idx), card, ...this.tasks.slice(idx)];
  }
}
