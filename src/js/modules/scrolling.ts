const createSmoothScroll = (UpSelector: string) => {
  const upElement: HTMLElement | null = document.querySelector(UpSelector);

  if (upElement) {
    window.addEventListener("scroll", () => {
      if (document.documentElement.scrollTop > 1650) {
        upElement.classList.add("animated", "fadeIn");
        upElement.classList.remove("fadeOut");
      } else {
        upElement.classList.add("fadeOut");
        upElement.classList.remove("fadeIn");
      }
    });
    // with RAF
    const links: NodeListOf<HTMLAnchorElement> =
      document.querySelectorAll('[href^="#"]'); // href's, which begins with # (all local links)
    let speed = 0.2;

    links.forEach((link) => {
      link.addEventListener("click", function (event: Event) {
        event.preventDefault();

        let scrollTop = document.documentElement.scrollTop; // сколько пользователь прокрутил от верхней части страницы
        let hash = this.hash;
        if (hash !== "") {
          const hashElement = document.querySelector(hash);
          if (hashElement) {
            let toBlock = hashElement.getBoundingClientRect().top; // сколько до нужного элемента
            if (toBlock) {
              let start: null | number = null;

              requestAnimationFrame(step);

              function step(time: number) {
                if (start === null) {
                  start = time; // время начала анимации
                } // выполняется только один раз

                let progress = time - start; //сколько уже пролистали
                let pxls = //кол-во пикселей, которые нужно пролистать за анимацию
                  toBlock < 0 // листаем наверх страницы
                    ? Math.max(
                        scrollTop - progress / speed, //scrollTop - сколько уже прошли
                        scrollTop + toBlock
                      ) //возвращает макс значение из аргуентов
                    : Math.min(
                        scrollTop + progress / speed,
                        scrollTop + toBlock
                      );

                document.documentElement.scrollTo(0, pxls); //по x оси не двигаемся

                if (pxls != scrollTop + toBlock) {
                  // когда анимация останавливается
                  requestAnimationFrame(step); // рекурсия - функция вызывает себя же
                } else {
                  location.hash = hash; // обновляем hash
                }
              }
            }
          }
        }
      });
    });
  }
};

export default createSmoothScroll;
