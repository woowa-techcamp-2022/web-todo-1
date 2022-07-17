import { qsAll } from "../util";

export function removeCard(id, tasks) {
  return tasks.filter((task) => task.id !== Number(id));
}

export function insertCard(tasks, card, idx) {
  return [...tasks.slice(0, idx), card, ...tasks.slice(idx)];
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

export function moveCard(from, to, tasks) {
  const newTasks = [...tasks];

  const [card] = newTasks.splice(from, 1);
  newTasks.splice(to, 0, card);

  return newTasks;
}

export function getCurrentTaskIds(targetColumn) {
  return [...qsAll(".card", targetColumn)].map((task) => task.dataset.taskId);
}
