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
    let links: NodeListOf<HTMLAreaElement> =
      document.querySelectorAll('[href^="#"]'); // href's, which begins with # (all local links)
    let speed = 0.5;

    links.forEach((link) => {
      link.addEventListener("click", function (event) {
        event.preventDefault();

        let scrollTop = document.documentElement.scrollTop; // сколько пользователь прокрутил от верхней части страницы
        let hash = this.hash;
        let toBlock = document.querySelector(hash).getBoundingClientRect().top; // сколько до нужного элемента
        if (toBlock) {
          let start: null | number = null;

          requestAnimationFrame(step);

          function step(time: number) {
            if (start === null) {
              start = time;
            } // выполняется только один раз

            let progress = time - start; // time приходит новый, start остается из условия
            let pxls = //кол-во пикселей, которые нужно пролистать за анимацию
              toBlock < 0
                ? Math.max(scrollTop - progress / speed, scrollTop + toBlock) //возвращает макс значение из аргуентов
                : Math.min(scrollTop + progress / speed, scrollTop + toBlock);

            document.documentElement.scrollTo(0, pxls); //по x оси не двигаемся

            if (pxls != scrollTop + toBlock) {
              // когда анимация останавливается
              requestAnimationFrame(step);
            } else {
              location.hash = hash;
            }
          }
        }
      });
    });

    //with pure JS
    // const calcScroll = () => {
    //   upElement.addEventListener("click", function (event: Event) {
    //     let scrollTop = Math.round(body.scrollTop || element.scrollTop); // насколько вниз проскролил пользователь от элементов
    //     const hash = this.getAttribute("href");
    //     if (!hash) return;
    //     if (hash !== "") {
    //       event.preventDefault();
    //       let hashElement: HTMLElement | null = document.querySelector(hash); // это header
    //       if (hashElement) {
    //         let hashElementTop = 0;
    //         //вычисляем отступ от верхней границы всей страницы до верхней граница hashElement(header)
    //         while (hashElement?.offsetParent) {
    //           // возвращает ссылку на ближайший элемент со значением position - для headder это body
    //           hashElementTop += hashElement.offsetTop; // расстояние от родительского элемента до текущего
    //           hashElement = hashElement.offsetParent as HTMLElement; // hashElement = родительскому, далее родительский hashElement = новому родительскому и так далее до body
    //         }

    //         hashElementTop = Math.round(hashElementTop); // =0

    //         smoothScroll(scrollTop, hashElementTop, hash); //this.hash - #up - точка, до куда надо подняться
    //       }
    //     }
    //   });
    // };

    // const smoothScroll = (from: number, to: number, hash: string) => {
    //   let timeInterval = 1;
    //   let prevScrollTop: number;
    //   let scrollSpeed: number;

    //   if (to > from) {
    //     scrollSpeed = 30;
    //   } else {
    //     scrollSpeed = -30;
    //   }

    //   let move = setInterval(function () {
    //     let scrollTop = Math.round(body.scrollTop || element.scrollTop); //расстояние до конца страницы, при запуске calcScroll один раз расчитывается значение,тут надо динамически рассчитвать
    //     //определяем, в какую сторону двигаться

    //     if (
    //       prevScrollTop === scrollTop ||
    //       (to > from && scrollTop >= to) || // когда навправление скролла сверху вниз
    //       (to < from && scrollTop <= to) // когда навправление скролла снизу вверх
    //     ) {
    //       clearInterval(move);
    //       history.replaceState(
    //         history.state,
    //         document.title,
    //         location.href.replace(/#.*$/g, "") + hash //url, содержащий hash, заменяется на новый hash
    //       ); // hash получаем из this.hash
    //     } else {
    //       body.scrollTop += scrollSpeed;
    //       element.scrollTop += scrollSpeed;
    //       prevScrollTop = scrollTop; //prevScrollTop будет каждый раз перезаписываться
    //     }
    //   }, timeInterval);
    // };
    // calcScroll();
  }
};

export default createSmoothScroll;
