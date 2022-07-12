export default class Store {
  constructor(storage) {
    if (!storage) throw new Error("no storage");

    this.storage = storage;
  }
}
