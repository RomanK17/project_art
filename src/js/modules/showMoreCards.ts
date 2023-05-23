import { getCards } from "../requests";

const showMoreCards = (triggerButtonSelector: string, wrapper: string) => {
  const triggerButton: HTMLButtonElement | null = document.querySelector(
    triggerButtonSelector
  );
  if (triggerButton !== null) {
    triggerButton.addEventListener("click", function () {
      getCards("http://localhost:3000/styles")
        .then((result) => createCards(result))
        .catch((error) => console.log(error)); // доабвить инфу для пользователя при ошибке

      this.remove();
    });

    function createCards(response) {
      response.forEach((item) => {
        const card = document.createElement("div");
        card.classList.add(
          "animated",
          "fadeInUp",
          "col-sm-3",
          "col-sm-offset-0",
          "col-xs-10",
          "col-xs-offset-1"
        );

        card.innerHTML = `  
        <div class=styles-block>
          <img src=${item.src} alt='пример работы'>
          <h4>${item.title}</h4>
          <a href="${item.link}">Подробнее</a>
        </div>`;

        document.querySelector(wrapper).append(card);
      });
    }
  }
};

export default showMoreCards;
