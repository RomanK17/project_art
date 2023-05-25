const replaceWithImageOnHover = (boxesSelector: string) => {
  //sizes-block
  const boxes = document.querySelectorAll(boxesSelector);

  function showImg(img: HTMLImageElement, paragraphs: NodeListOf<Element>) {
    img.src = img.src.slice(0, -4) + "-1.png";
    paragraphs.forEach((p) => {
      p.style.display = "none";
    });
  }

  function hideImg(img: HTMLImageElement, paragraphs: NodeListOf<Element>) {
    img.src = img.src.slice(0, -6) + ".png";
    box.querySelectorAll("p").forEach((p) => {
      p.style.display = "block";
    });
  }

  boxes.forEach((box) => {
    const img = box.querySelector("img");
    const paragraphs = box.querySelectorAll("p:not(.sizes-hit)");

    box.addEventListener("mouseover", () => showImg(img, paragraphs));
    box.addEventListener("mouseout", () => hideImg(img, paragraphs));
  });
};

export default replaceWithImageOnHover;
