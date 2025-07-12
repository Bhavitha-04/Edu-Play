function markAsRead(cardId, button) {
    const card = document.getElementById(cardId);
    card.classList.add("read");
    button.disabled = true;
    button.innerText = "Read ✓";
  }
  