// src/scripts/projectFilter.js
(function () {
  const VISIBLE_CLASS = "project-visible";
  const HIDDEN_CLASS = "project-hidden";
  const HIDE_TIMEOUT = 300;

  function initProjectFilter() {
    const container = document.getElementById("projects-container");
    const buttons = Array.from(document.querySelectorAll(".filter-btn"));
    if (!container || !buttons.length) return;

    const cards = Array.from(container.querySelectorAll("[data-categoria]"));
    if (!cards.length) return;

    function showCard(card) {
      card.style.display = "flex";
      requestAnimationFrame(() => {
        card.classList.remove(HIDDEN_CLASS);
        card.classList.add(VISIBLE_CLASS);
      });
    }

    function hideCard(card) {
      card.classList.remove(VISIBLE_CLASS);
      card.classList.add(HIDDEN_CLASS);
      setTimeout(() => {
        if (card.classList.contains(HIDDEN_CLASS)) card.style.display = "none";
      }, HIDE_TIMEOUT);
    }

    function applyFilter(filter) {
      const normalized = filter.toLowerCase();
      cards.forEach((card) => {
        const categoria = (
          card.getAttribute("data-categoria") ?? ""
        ).toLowerCase();
        const match = normalized === "all" || categoria === normalized;
        match ? showCard(card) : hideCard(card);
      });
    }

    function setActive(btn) {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    }

    buttons.forEach((btn) => {
      btn.onclick = () => {
        const filter = btn.dataset.filter || "all";
        setActive(btn);
        applyFilter(filter);
      };
    });

    const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
    if (allBtn) {
      setActive(allBtn);
      applyFilter("all");
    }
  }

  document.addEventListener("astro:page-load", initProjectFilter);
  window.addEventListener("load", initProjectFilter);
})();
