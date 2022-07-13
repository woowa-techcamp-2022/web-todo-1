/* eslint-disable class-methods-use-this */
export default class Template {
  getColumns(columnIds, data) {
    return columnIds.map((columnId) => this.getColumn(columnId, data)).join("");
  }

  getCard({ title, body, author }) {
    return `<div class="card">
        <div class="header">
          <div class="title">
            <span>${title}</span>
          </div>
          <button>
            <svg
              class="btn-delete-icon"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.5 11.25L0.75 10.5L5.25 6L0.75 1.5L1.5 0.75L6 5.25L10.5 0.75L11.25 1.5L6.75 6L11.25 10.5L10.5 11.25L6 6.75L1.5 11.25Z"
                fill="black"
              />
            </svg>
          </button>
        </div>
        <div class="body">
          <p>${body}</p>
        </div>
        <div class="caption">${author}</div>
      </div>`;
  }

  getColumn({ key, name }, data) {
    return `
    <div class="column" data-id-${key}>
            <div class="header">
              <div class="title">
                <span>${name}</span>
                <span class="badge">2</span>
              </div>
              <div class="btn-wrapper">
                <button>
                  <svg
                    class="btn-plus-icon"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.105709 7.53033L0.105709 6.46967H6.46967V0.105713H7.53033V6.46967H13.8943V7.53033H7.53033V13.8943H6.46967V7.53033H0.105709Z"
                      fill="black"
                    />
                  </svg>
                </button>
                <button>
                  <svg
                    class="btn-delete-icon"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.5 11.25L0.75 10.5L5.25 6L0.75 1.5L1.5 0.75L6 5.25L10.5 0.75L11.25 1.5L6.75 6L11.25 10.5L10.5 11.25L6 6.75L1.5 11.25Z"
                      fill="black"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div class="card-wrapper">
              ${data[key].tasks.map((task) => this.getCard(task)).join("")}
            </div>
          </div>`;
  }
}
