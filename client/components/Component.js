import Template from "./Template";

export default class Component {
  constructor(container, props) {
    // component의 contianer는 이벤트 위임을 할 수 있는 것들
    this.container = container;
    this.props = props;
    this.template = new Template();
  }

  render() {}

  init() {}
}
