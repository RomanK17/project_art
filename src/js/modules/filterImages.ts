const filterImages = () => {
  const menu = document.querySelector(".portfolio-menu");
  const portfolioWrapper = document.querySelector(".portfolio-wrapper");
  if (menu && portfolioWrapper) {
    const allBtns = menu.querySelectorAll("li");
    const allWorksBtn = menu.querySelector(".all");
    const loversBtn = menu.querySelector(".lovers");
    const chefBtn = menu.querySelector(".chef");
    const girlBtn = menu.querySelector(".girl");
    const guyBtn = menu.querySelector(".guy");
    const grandmotherBtn = menu.querySelector(".grandmother");
    const granddadBtn = menu.querySelector(".granddad");

    const allWorksImgs = portfolioWrapper.querySelectorAll(".all");
    const loversImgs = portfolioWrapper.querySelectorAll(".lovers");
    const chefImgs = portfolioWrapper.querySelectorAll(".chef");
    const girlImgs = portfolioWrapper.querySelectorAll(".girl");
    const guyImgs = portfolioWrapper.querySelectorAll(".guy");

    const noImgs = document.querySelector(".portfolio-no");

    const filterByImages = (images: NodeListOf<Element> | undefined) => {
      allWorksImgs.forEach((image) => {
        image.style.display = "none";
        image.classList.remove("animated", "fadeIn");
      });

      if (images) {
        images.forEach((image) => {
          image.style.display = "block";
          image.classList.add("animated", "fadeIn");
        });
      } else {
        noImgs.style.display = "block";
        noImgs.classList.add("animated", "fadeIn");
      }
    };

    menu.addEventListener("click", (event) => {
      const target = event.target;

      if (target && target.tagName == "LI") {
        allBtns.forEach((btn) => {
          btn.classList.remove("active");
          target.classList.add("active");
        });
      }

      switch (target) {
        case allWorksBtn:
          filterByImages(allWorksImgs);
          break;
        case loversBtn:
          filterByImages(loversImgs);
          break;
        case chefBtn:
          filterByImages(chefImgs);
          break;
        case girlBtn:
          filterByImages(girlImgs);
          break;
        case guyBtn:
          filterByImages(guyImgs);
          break;
        case grandmotherBtn:
        case granddadBtn:
          filterByImages(undefined);
          break;
        default:
          console.error("Invalid button clicked");
      }
    });
  }
};

export default filterImages;
