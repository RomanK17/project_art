const sliders = ({
  slides,
  sliderDir,
  prevSlideBtn,
  nextSlideBtn,
}: {
  slides: string;
  sliderDir: string;
  prevSlideBtn: string;
  nextSlideBtn: string;
}) => {
  let pause: number = 0;
  let slideIndex: number = 1;
  const sliderImages = document.querySelectorAll(slides);

  const showSlide = (index: number) => {
    if (index > sliderImages.length) slideIndex = 1;
    if (index <= 0) slideIndex = sliderImages.length;

    sliderImages.forEach((slideImage) => {
      slideImage.classList.add("animated");
      slideImage.setAttribute("style", "display : none;");
    });

    (sliderImages[slideIndex - 1] as HTMLElement).style.display = "block";
  };

  showSlide(slideIndex);

  const changeSlide = (direction: number) => {
    showSlide((slideIndex += direction));
  };

  if (prevSlideBtn && nextSlideBtn) {
    const prevBtn = document.querySelector(prevSlideBtn);
    const nextBtn = document.querySelector(nextSlideBtn);

    prevBtn?.addEventListener("click", () => {
      changeSlide(-1);
      sliderImages[slideIndex - 1].classList.remove("slideInRight");
      sliderImages[slideIndex - 1].classList.add("slideInLeft");
    });

    nextBtn?.addEventListener("click", () => {
      changeSlide(1);
      sliderImages[slideIndex - 1].classList.remove("slideInLeft");
      sliderImages[slideIndex - 1].classList.add("slideInRight");
    });
  }

  const activateAnimation = () => {
    if (sliderDir === "vertical") {
      pause = setInterval(() => {
        changeSlide(1);
        sliderImages[slideIndex - 1].classList.add("slideInDown");
      }, 3000);
    } else {
      pause = setInterval(() => {
        changeSlide(1);
        sliderImages[slideIndex - 1].classList.remove("slideInLeft");
        sliderImages[slideIndex - 1].classList.add("slideInRight");
      }, 3000);
    }
  };

  activateAnimation();

  const ParentSliderElement = sliderImages[0].parentNode as HTMLElement;

  ParentSliderElement.addEventListener("mouseenter", () => {
    clearInterval(pause);
  });

  ParentSliderElement.addEventListener("mouseleave", () => {
    activateAnimation();
  });
};

export default sliders;
