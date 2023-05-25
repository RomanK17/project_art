const filterImages = () => {
  const menu = document.querySelector(".portfolio-menu");
  const portfolioWrapper = document.querySelector(".portfolio-wrapper");
  if (menu && portfolioWrapper) {
    const allBtns = menu.querySelectorAll("li");
    const allWorksImgs = portfolioWrapper.querySelectorAll(".all");
    const loversImgs = portfolioWrapper.querySelectorAll(".lovers");
    const chefImgs = portfolioWrapper.querySelectorAll(".chef");
    const girlImgs = portfolioWrapper.querySelectorAll(".girl");
    const guyImgs = portfolioWrapper.querySelectorAll(".guy");
    const noImgs: HTMLElement | null = document.querySelector(".portfolio-no");

    if (!menu || !allBtns || !allWorksImgs || !noImgs) return;

    const imagesMap = new Map([
      [allBtns[0], allWorksImgs],
      [allBtns[1], loversImgs],
      [allBtns[2], chefImgs],
      [allBtns[3], girlImgs],
      [allBtns[4], guyImgs],
      [allBtns[5], undefined],
      [allBtns[6], undefined],
    ]);

    const filterByImages = (images: NodeListOf<Element> | undefined) => {
      allWorksImgs.forEach((image) => {
        (image as HTMLElement).style.display = "none";
        image.classList.remove("animated", "fadeIn");
      });

      if (images) {
        images.forEach((image) => {
          (image as HTMLElement).style.display = "block";
          image.classList.add("animated", "fadeIn");
        });
      } else {
        noImgs.style.display = "block";
        noImgs.classList.add("animated", "fadeIn");
      }
    };

    menu.addEventListener("click", (event) => {
      const target = event.target as HTMLLIElement;

      if (target && target.tagName == "LI") {
        allBtns.forEach((btn) => btn.classList.remove("active"));
        target.classList.add("active");
        filterByImages(imagesMap.get(target));
      }
    });
  }
};

export default filterImages;
