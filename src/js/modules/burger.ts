const createBurger = (menuSelector: string, triggerSelector: string) => {
  const menuElement: HTMLUListElement | null =
    document.querySelector(menuSelector);
  const burgerElement: HTMLButtonElement | null =
    document.querySelector(triggerSelector);

  const breakpoint = 993;

  if (menuElement && burgerElement) {
    menuElement.style.display = "none";

    burgerElement.addEventListener("click", () => {
      if (
        menuElement.style.display == "none" &&
        window.screen.availWidth < breakpoint
      ) {
        menuElement.style.display = "block";
      } else {
        menuElement.style.display = "none";
      }
    });

    window.addEventListener("resize", () => {
      if (window.screen.availWidth > breakpoint)
        menuElement.style.display = "none";
    });
  }
};

export default createBurger;
