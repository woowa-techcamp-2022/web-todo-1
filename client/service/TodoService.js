export function removeCard(id, tasks) {
  tasks = tasks.filter((card) => card.id !== id);
}

/** idx없으면 제일 맨뒤에 넣어준다. */
export function insertCard(card, idx) {
  // eslint-disable-next-line no-param-reassign
  idx = idx || this.tasks.length;
  this.tasks = [...this.tasks.slice(0, idx), card, ...this.tasks.slice(idx)];
}

/**
 * 
 * @param {
 } card 
 * @param {*} tasks 
 * @returns 
 */
export function shiftCard(card, tasks) {
  return [card, ...tasks];
}
