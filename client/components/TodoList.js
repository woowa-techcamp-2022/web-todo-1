import { shiftCard } from "../service/TodoService";
import Store from "../util/Store";
import Column from "./Column";
import Component from "./Component";
import { data } from "./mockdata";

export default class TodoList extends Component {
  constructor(container, props) {
    super(container, props);

    const initialState = {
      todoList: data,
    };

    // 상태 저장소 setState를 할 때마다 새로 랜더링한다.
    this.store = new Store(initialState, this.render.bind(this));
    this.columnComponents = this.getColumComponents();

    this.init();
    this.bindEvents();
  }

  bindEvents() {
    this.on("@newTask", this.addNewCard.bind(this));
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
