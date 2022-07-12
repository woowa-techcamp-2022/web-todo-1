export default class Controller {
  constructor(
    { todoListStore, actionStackStore },
    { todoListView, actionStackView }
  ) {
    this.todoListStore = todoListStore;
    // this.todolistStore = actionStackStore;
    this.todoListView = todoListView;
    this.actionStackView = actionStackView;
    this.render();
  }

  render() {
    this.todoListView.render(this.todoListStore.getTasks());
  }
}
