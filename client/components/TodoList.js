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
    this.store = new Store(initialState, this.render);
    this.columnComponents = this.getColumComponents();

    this.init();
  }

  getColumComponents() {
    const columnComponents = [];
    const todoList = this.store.state["todoList"];
    Object.keys(todoList).forEach((columnID) => {
      const container = document.createElement("div");
      container.dataset.columnId = columnID;
      container.classList.add("column");
      // column id는 database에 있는 foreign 키로 사용되는 id이다.

      // todoKey는 한일,끝마친 일, 이런 식으로 들어간다.
      const newColumn = new Column(container, {
        columnID: columnID,
        columnName: todoList[columnID]["name"],
        todoList,
      });

      columnComponents.push(newColumn);
    });

    return columnComponents;
  }

  render() {
    const { todoList } = this.store.state;

    const columTemplate = this.columnComponents
      .map((columnComponent) => columnComponent.render(todoList))
      .join("");

    this.container.innerHTML = columTemplate;

    return this.container.outerHTML;
  }

  init() {
    // DB에서
    this.render();
  }
}
