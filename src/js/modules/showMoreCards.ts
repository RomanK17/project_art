import { getCards } from "../requests";

const showMoreCards = (triggerButtonSelector: string, wrapper: string) => {
  const triggerButton: HTMLButtonElement | null = document.querySelector(
    triggerButtonSelector
  );
  if (triggerButton !== null) {
    const parent = document.querySelector(wrapper);
    const errorMessage = document.createElement("div");
    errorMessage.innerHTML = "Ошибка. Повторите попытку позже.";

    triggerButton.addEventListener("click", function () {
      getCards("/db.json")
        .then((result) => {
          createCards(result.styles);
          this.remove();
        })
        .catch((error) => {
          triggerButton.append(errorMessage);
          console.log(error);
        });
    });

    function createCards(response: []) {
      response.forEach(({ src, title, link }) => {
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
          <img src=${src} alt='пример работы'>
          <h4>${title}</h4>
          <a href="${link}">Подробнее</a>
        </div>`;

        parent?.append(card);
      });
    }
  }
};

export default showMoreCards;
