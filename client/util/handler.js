export function textareaHeightChange(target) {
  if (target.tagName === "TEXTAREA") {
    target.style.height = `${target.scrollHeight}px`;
  }
}
