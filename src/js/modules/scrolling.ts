const createSmoothScroll = (UpSelector: string) => {
  const upElement: HTMLElement | null = document.querySelector(UpSelector);
  const element = document.documentElement;
  const body = document.body;

  if (upElement) {
    window.addEventListener("scroll", () => {
      if (element.scrollTop > 1650) {
        upElement.classList.add("animated", "fadeIn");
        upElement.classList.remove("fadeOut");
      } else {
        upElement.classList.add("fadeOut");
        upElement.classList.remove("fadeIn");
      }
    });

    const calcScroll = () => {
      upElement.addEventListener("click", function (event: Event) {
        let scrollTop = Math.round(body.scrollTop || element.scrollTop);

        if (this.hash !== "") {
          event.preventDefault();
          let hashElement = document.querySelector(this.hash);
          let hashElementTop = 0;

          while (hashElement.offsetParent) {
            // возвращает ссылку на ближайший элемент со значением position
            hashElementTop += hashElement.offsetTop; // расстояние от родительского элемента до текущего
            hashElement = hashElement.offsetParent;
          }

          hashElementTop = Math.round(hashElementTop);
          smoothScroll(scrollTop, hashElementTop, this.hash);
        }
      });
    };

    const smoothScroll = (from, to, hash) => {
      let timeInterval = 1;
      let prevScrollTop;
      let speed;

      if (to > from) {
        speed = 30;
      } else {
        speed = -30;
      }

      let move = setInterval(function () {
        let scrollTop = Math.round(body.scrollTop || element.scrollTop); //при запуске calcScroll один раз расчитывается значение,тут надо динамически рассчитвать

        if (
          prevScrollTop === scrollTop ||
          (to > from && scrollTop >= to) ||
          (to < from && scrollTop <= to)
        ) {
          clearInterval(move);
          history.replaceState(
            history.state,
            document.title,
            location.href.replace(/#.*$/g, "") + hash
          ); // hash получаем из this.hash
        } else {
          body.srollTop += speed;
          element.scrollTop += speed;
          prevScrollTop = scrollTop; //prevScrollTop будет каждый раз перезаписываться в отличие от from
        }
      }, timeInterval);
    };
    calcScroll();
  }
};

export default createSmoothScroll;
