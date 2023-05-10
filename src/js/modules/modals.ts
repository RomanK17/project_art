export default function modals() {
  let modalTimer: number;

  const bindModal = ({
    modalTriggers,
    modalSelector,
    closeSelector,
    closeClickOverlay = true,
  }: {
    modalTriggers: string;
    modalSelector: string;
    closeSelector: string;
    closeClickOverlay?: boolean;
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
        if (event.target) {
          event.preventDefault();
        }
        showModal();
        clearTimeout(modalTimer);
      });
    });

    close.addEventListener("click", () => closeModal());

    modal.addEventListener("click", (event) => {
      if (event.target === modal && closeClickOverlay) {
        closeModal();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.code === "Escape" && modal.style.display === "block")
        closeModal();
    });
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

  showModalByTime(".popup-consultation", 60000);
}
