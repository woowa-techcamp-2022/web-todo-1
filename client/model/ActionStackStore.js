import Card from "../Card";

export default class TodoList {
  constructor(title) {
    this.author = title;
    this.cards = [];
    this.init();
  }

  init() {
    // DB에서 TodoList를 가져온다.
    // title로는 Todo, In progress, Done
    const card1 = new Card("Github 공부하기", "- commit, push, add", "연정");
    const card2 = new Card("Github 공부하기", "- commit, push, add", "교영");
    this.cards = [card1, card2];
  }

  removeCard(id) {
    this.cards = this.card.filter((card) => card.id !== id);
  }

  insertCard(card, idx) {
    // eslint-disable-next-line no-param-reassign
    idx = idx || this.cards.length;
    this.cards = [...this.cards.slice(0, idx), card, ...this.cards.slice(idx)];
  }
}
