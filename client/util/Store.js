export default class Store {
  constructor(initialState, render) {
    this.state = { ...initialState };
    this.render = render || null;
  }

  setState = (property, newValue) => {
    this.state = {
      ...this.state,
      [property]: newValue,
    };
    this.render && this.render();
  };
}
