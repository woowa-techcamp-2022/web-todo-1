export function textareaHeightChange(target) {
  if (target.tagName === "TEXTAREA") {
    target.style.height = "1px";
    target.style.height = `${target.scrollHeight}px`;
  }
}

export function deactivateDeleteCard({ target }) {
  const card = target.closest(".card.delete");
  const deleteIcon = target.closest(".btn-delete-icon");
  if (!card || deleteIcon) {
    return;
  }
  if (!target.closest(".btn-delete-icon")) {
    card.classList.remove("delete");
  }
}

export function activateDeleteCard({ target }) {
  if (!target.closest(".btn-delete-icon")) {
    return;
  }
  const card = target.closest(".card");

  if (!card) {
    return;
  }
  card.classList.add("delete");
}
