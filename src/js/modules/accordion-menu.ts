const createAccordion = (triggersSelector: string, contentSelector: string) => {
  const btns: NodeListOf<HTMLButtonElement> =
    document.querySelectorAll(triggersSelector);
  const content = document.querySelectorAll(contentSelector);

  content.forEach((block) => {
    block.classList.add("animated", "fadeInDown");
  });

  btns.forEach((btn) => {
    btn.addEventListener("click", function () {
      if (!this.classList.contains("active")) {
        btns.forEach((btn) => {
          btn.classList.remove("active", "active-style");
        });
        this.classList.add("active", "active-style");
      }
    });
  });
};

export default createAccordion;
