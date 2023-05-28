const createAccordion = (triggersSelector: string) => {
  const btns: NodeListOf<HTMLButtonElement> =
    document.querySelectorAll(triggersSelector);

  btns.forEach((btn) => {
    btn.addEventListener("click", function () {
      btns.forEach((btn) => {
        btn.classList.remove("active-style");
        const btnContent = btn.nextElementSibling as HTMLElement;
        if (btnContent) {
          btnContent.classList.remove("active-content");
          btnContent.style.maxHeight = "0";
        }
      });

      const content = this.nextElementSibling as HTMLElement;
      if (content) {
        this.classList.toggle("active-style");
        content.classList.toggle("active-content");

        if (this.classList.contains("active-style")) {
          content.style.maxHeight = `${content.scrollHeight + 80}px`;
        } else {
          content.style.maxHeight = "0";
        }
      }
    });
  });
};

export default createAccordion;
