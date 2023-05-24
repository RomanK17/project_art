import { getCards } from "../requests";

const showMoreCards = (triggerButtonSelector: string, wrapper: string) => {
  const triggerButton: HTMLButtonElement | null = document.querySelector(
    triggerButtonSelector
  );
  if (triggerButton !== null) {
    const parent = document.querySelector(wrapper);

    triggerButton.addEventListener("click", function () {
      getCards("http://localhost:3000/styles")
        .then((result) => {
          createCards(result);
          console.log(result);
        })
        .catch((error) => console.log(error)); // доабвить инфу для пользователя при ошибке

      this.remove();
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
