import Column from "./column";

export default class TodoListStore {
  constructor(todoListIds) {
    this.columnMap = {};
    todoListIds.forEach((id) => {
      // column 안에 Task가 있다.
      this.columnMap[id.key] = new Column(id);
    });
  }

  getTasks() {
    const tasks = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(this.columnMap)) {
      tasks[key] = value;
    }
    return tasks;
  }
}
