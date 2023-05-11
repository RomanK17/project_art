export default function modals() {
  let modalTimer: number;
  let btnPressed: boolean = false;

  const bindModal = ({
    modalTriggers,
    modalSelector,
    closeSelector,
  }: {
    modalTriggers: string;
    modalSelector: string;
    closeSelector: string;
  }) => {
    const modal = document.querySelector<HTMLElement>(modalSelector)!;
    const close = document.querySelector<HTMLElement>(closeSelector)!;
    const triggers = document.querySelectorAll<HTMLElement>(modalTriggers);
    const scroll = calcScroll();

    function calcScroll() {
      let div = document.createElement("div");
      div.classList.add("for-div-scroll");
      document.body.appendChild(div);

      let scrollWidth = div.offsetWidth - div.clientWidth;
      div.remove();

      return scrollWidth;
    }

    const closeAllModals = () => {
      document
        .querySelectorAll<HTMLElement>("[data-modal]")
        .forEach((modalWindow: HTMLElement) => {
          modalWindow.style.display = "none";
          document.body.style.marginRight = `0px`;
        });
    };

    const showModal = () => {
      modal.style.display = "block";
      close.focus();
      document.body.style.overflow = "hidden";
      document.body.style.marginRight = `${scroll}px`;
    };

    const closeModal = () => {
      modal.style.display = "none";
      closeAllModals();
      document.body.style.overflow = "visible";
      (document.activeElement as HTMLElement).focus();
    };

    triggers.forEach((trigger) => {
      trigger.addEventListener("click", (event) => {
        const target = event.target as HTMLElement;
        if (target) event.preventDefault();
        if (target.classList.contains("fixed-gift")) target.remove();
        showModal();
        clearTimeout(modalTimer);
      });
    });

    close.addEventListener("click", () => closeModal());

    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeModal();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.code === "Escape" && modal.style.display === "block")
        closeModal();
    });

    const openByScroll = (selector: string) => {
      window.addEventListener("scroll", () => {
        if (
          !btnPressed &&
          window.innerHeight + window.pageYOffset >= document.body.offsetHeight
        )
          document.body.querySelector<HTMLElement>(selector)!.click();
      });
    };

    openByScroll(".fixed-gift");
  };

  const showModalByTime = (selector: string, time: number) => {
    modalTimer = setTimeout(() => {
      (document.querySelector(selector) as HTMLElement).style.display = "block";
      document.body.style.overflow = "hidden";
    }, time);
  };

  bindModal({
    modalTriggers: ".button-design",
    modalSelector: ".popup-design",
    closeSelector: ".popup-design .popup-close",
  });

  bindModal({
    modalTriggers: ".button-consultation",
    modalSelector: ".popup-consultation",
    closeSelector: ".popup-consultation .popup-close",
  });

  bindModal({
    modalTriggers: ".fixed-gift",
    modalSelector: ".popup-gift",
    closeSelector: ".popup-gift .popup-close",
  });

  showModalByTime(".popup-consultation", 60000);
}
