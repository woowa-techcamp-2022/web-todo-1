import Component from "./Component";
import { createElementWithClass, emit } from "../util";
import Store from "../util/Store";

/**
 * props : columnName, columnId, todoList
 */
export default class History extends Component {
  constructor(container, props) {
    super(container, props);
    this.store = new Store({ isOpen: false }, this.render.bind(this));
  }

  render(history) {
    const actionTypeMap = {
      1: ({ title, fromColumnTitle }) =>
        `${title}를 ${fromColumnTitle}에 <strong>등록</strong>하였습니다.`,
      2: ({ title }) => `${title}를 <strong>삭제</strong>하였습니다.`,
      4: ({ fromColumnTitle, toColumnTitle, title }) =>
        `${title}를 ${fromColumnTitle}에서 ${toColumnTitle}으로 <strong>이동</strong>하였습니다.`,
    };
    this.container.innerHTML = history
      .map((item) => {
        const html = `
        <li class="action-item">
            <div class="profile">
              <img src="60c256386b0f7fdefb50.png" alt="">
            </div>
            <div>
              <div class="header">@${item.author}</div>
              <div class="body">
                ${actionTypeMap[item.actionType](item)}
              </div>
              <div class="time-stamp">1분전</div>
            </div>
          </li>
        `;

        return html;
      })
      .join("");
  }
}