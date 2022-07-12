export default class Task {
  constructor(title, body, author) {
    this.title = title;
    this.body = body;
    this.author = author;
  }

  edit({ title, body, author }) {
    this.title = title;
    this.body = body;
    this.author = author;
  }
}
