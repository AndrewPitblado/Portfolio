const timelineShell = document.querySelector(".timeline-shell");

if (timelineShell) {
  const timelineCards = timelineShell.querySelectorAll(".timeline-card");

  const resetCardScroll = (card) => {
    // Wait until hover/focus styles are removed, then reset internal scroll.
    requestAnimationFrame(() => {
      if (!card.matches(":hover") && !card.matches(":focus-within")) {
        card.scrollTop = 0;
      }
    });
  };

  timelineCards.forEach((card) => {
    card.addEventListener("mouseleave", () => {
      resetCardScroll(card);
    });

    card.addEventListener("focusout", () => {
      resetCardScroll(card);
    });

    card.addEventListener(
      "touchend",
      () => {
        resetCardScroll(card);
      },
      { passive: true },
    );
  });
}
