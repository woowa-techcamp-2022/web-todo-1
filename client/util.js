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
  const event = new CustomEvent(eventName, { detail });
  target.dispatchEvent(event);
}
