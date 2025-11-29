export function initExperienceTabs() {
  const tabButtons = document.querySelectorAll("[data-index].tabbutton");
  const tabContents = document.querySelectorAll("[data-index].tabcontent");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const index = button.getAttribute("data-index");

      // Quitar clase 'active' de todos
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      // Activar el seleccionado
      button.classList.add("active");
      const content = document.querySelector(
        `.tabcontent[data-index='${index}']`
      );
      if (content) content.classList.add("active");
    });
  });
}
