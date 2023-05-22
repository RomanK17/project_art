const showMoreCards = (
  triggerButtonSelector: string,
  cardsSelector: string
) => {
  const triggerButton: HTMLButtonElement | null = document.querySelector(
    triggerButtonSelector
  );
  if (triggerButton !== null) {
    const cards = document.querySelectorAll(cardsSelector);

    triggerButton?.addEventListener("click", () => {
      cards.forEach((card) => {
        card.classList.remove(
          "hidden-lg",
          "hidden-md",
          "hidden-sm",
          "hidden-xs"
        );
        card.classList.add(
          "animated",
          "fadeInUp",
          "col-sm-3",
          "col-sm-offset-0",
          "col-xs-10",
          "col-xs-offset-1"
        );
        triggerButton.style.display = "none";
      });
    });
  }
};

export default showMoreCards;
