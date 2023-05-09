export default function modals() {
  let modalTimer: number;

  const bindModal = ({
    modalTrigger,
    modalSelector,
    closeSelector,
    closeClickOverlay = true,
  }: {
    modalTrigger: string;
    modalSelector: string;
    closeSelector: string;
    closeClickOverlay?: boolean;
  }) => {
    const modal = document.querySelector<HTMLElement>(modalSelector)!;
    const close = document.querySelector<HTMLElement>(closeSelector)!;
    const triggers = document.querySelectorAll<HTMLElement>(modalTrigger);

    const closeAllModals = () => {
      document
        .querySelectorAll<HTMLElement>("[data-modal]")
        .forEach((modalWindow: HTMLElement) => {
          modalWindow.style.display = "none";
        });
    };

    const showModal = () => {
      modal.style.display = "block";
      close.focus();
      document.body.style.overflow = "hidden";
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
    modalTrigger: ".button-design",
    modalSelector: ".popup-design",
    closeSelector: ".popup-design .popup-close",
  });

  showModalByTime(".popup", 60000);
}
