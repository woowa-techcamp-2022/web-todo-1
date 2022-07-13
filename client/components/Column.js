import Component from "./Component";
import Template from "./Template";
import Card from "./Card";

export default class Column extends Component {
  constructor(container, { columnName, columnID, todoList }) {
    super(container);
    this.columnName = columnName;
    this.columnID = columnID;
    this.template = new Template();

    const { tasks } = todoList[this.columnID];
    this.tasks = tasks;
    this.cardComponents = this.getCardComponents();
  }

  getCardComponents() {
    const cardComponents = [];

    this.tasks.forEach((task) => {
      const cardContainer = document.createElement("div");
      cardContainer.dataset.taskId = task.id;
      cardContainer.classList.add("card");

      const card = new Card(cardContainer, { ...task });
      cardComponents.push(card);
    });

    return cardComponents;
  }

  render(todoList) {
    const { tasks } = todoList[this.columnID];

    const innerHTML = `
    ${this.template.getColumnHeader({
      columnName: this.columnName,
      tasks,
    })}

    <div class="card-wrapper">
      ${this.cardComponents.map((card) => card.render()).join("")}
    </div>
    
 `;
    console.log(this.container);
    this.container.innerHTML = innerHTML;

    return this.container.outerHTML;
  }
}
