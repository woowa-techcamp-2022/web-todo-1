export function qs(selector, scope = document) {
  if (!selector) throw new Error("no selector");

  return scope.querySelector(selector);
}

export function qsAll(selector, scope = document) {
  if (!selector) throw new Error("no selector");

  return Array.from(scope.querySelectorAll(selector));
}

export function on(target, eventName, handler) {
  target.addEventListener(eventName, handler);
}

export function delegate(target, eventName, selector, handler) {
  const emitEvent = (event) => {
    const potentialElements = qsAll(selector, target);

    potentialElements.forEach((potentialElement) => {
      if (potentialElement === event.target) {
        return handler.call(event.target, event);
      }
      return false;
    });
  };

  on(target, eventName, emitEvent);
}

export function emit(target, eventName, detail) {
  const event = new CustomEvent(eventName, { detail, bubbles: true });
  target.dispatchEvent(event);
}

export function createElementWithClass(tagName, className) {
  const element = document.createElement(tagName);
  element.className = className;
  return element;
}

export function isBefore(element1, element2) {
  if (element1.parentNode === element2.parentNode) {
    let cur = element1.previousSibling;
    while (cur) {
      if (cur === element2) {
        return true;
      }
      cur = cur.previousSibling;
    }
  }
  return false;
}

export function formatRelativeDate(date = new Date()) {
  const TEN_SECOND = 10 * 1000;
  const A_MINUTE = 60 * 1000;
  const A_HOUR = 60 * A_MINUTE;
  const A_DAY = 24 * A_HOUR;

  const diff = new Date() - new Date(date);

  if (diff < TEN_SECOND) return `방금 전`;
  if (diff < A_MINUTE) return `${Math.floor(diff / 1000)}초 전`;
  if (diff < A_HOUR) return `${Math.floor(diff / 1000 / 60)}분 전`;
  if (diff < A_DAY) return `${Math.floor(diff / 1000 / 60 / 24)}시간 전`;

  return date.split("T")[0];
}
