const createBurger = (menuSelector: string, triggerSelector: string) => {
  const menuElement = document.querySelector(menuSelector);
  const burgerElement = document.querySelector(triggerSelector);

  if (menuElement && burgerElement) {
    menuElement.style.display = "none";

    burgerElement.addEventListener("click", () => {
      if (
        (menuElement.style.display = "none" && window.screen.availWidth < 993)
      ) {
        menuElement.style.display = "block";
      } else {
      }
    });
  }
};

export default createBurger;
