const createAccordion = (triggersSelector: string) => {
  const btns: NodeListOf<HTMLButtonElement> =
    document.querySelectorAll(triggersSelector);

  btns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const content = this.nextElementSibling as HTMLElement;

      btns.forEach((otherBtn) => {
        if (otherBtn !== this && otherBtn.classList.contains("active-style")) {
          otherBtn.classList.remove("active-style");
          const otherContent = otherBtn.nextElementSibling as HTMLElement;
          if (otherContent) {
            otherContent.classList.remove("active-content");
            otherContent.style.maxHeight = "0";
          }
        }
      });

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
