import Component from "./Component";
import Template from "./Template";

export default class Card extends Component {
  constructor(container, task) {
    super(container);
    this.task = task;
  }

  render() {
    const cardHTML = this.template.getCard({
      ...this.task,
    });
    this.container.innerHTML = cardHTML;
    return this.container.outerHTML;
  }
}
