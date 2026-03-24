const timelineShell = document.querySelector(".timeline-shell");

if (timelineShell) {
  const timelineCards = timelineShell.querySelectorAll(".timeline-card");
  const desktopQuery = window.matchMedia("(min-width: 901px)");
  const reducedMotionQuery = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );
  let rafId = null;
  let paused = false;
  let direction = 1;
  let lastTs = 0;
  const pxPerSecond = 50;

  const resetAnimation = () => {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    lastTs = 0;
  };

  const tick = (ts) => {
    if (!timelineShell || paused) {
      rafId = requestAnimationFrame(tick);
      return;
    }

    if (!lastTs) {
      lastTs = ts;
    }

    const elapsed = (ts - lastTs) / 1000;
    lastTs = ts;
    timelineShell.scrollLeft += direction * pxPerSecond * elapsed;

    const maxScrollLeft = timelineShell.scrollWidth - timelineShell.clientWidth;

    if (timelineShell.scrollLeft >= maxScrollLeft - 2) {
      direction = -1;
    } else if (timelineShell.scrollLeft <= 2) {
      direction = 1;
    }

    rafId = requestAnimationFrame(tick);
  };

  const shouldAnimate = () =>
    desktopQuery.matches && !reducedMotionQuery.matches;

  const setAnimationState = () => {
    resetAnimation();

    if (shouldAnimate()) {
      rafId = requestAnimationFrame(tick);
    }
  };

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

  timelineShell.addEventListener("mouseenter", () => {
    paused = true;
  });

  timelineShell.addEventListener("mouseleave", () => {
    paused = false;
    lastTs = 0;
  });

  timelineShell.addEventListener(
    "touchstart",
    () => {
      paused = true;
    },
    { passive: true },
  );

  timelineShell.addEventListener(
    "touchend",
    () => {
      paused = false;
      lastTs = 0;
    },
    { passive: true },
  );

  desktopQuery.addEventListener("change", setAnimationState);
  reducedMotionQuery.addEventListener("change", setAnimationState);
  setAnimationState();
}
