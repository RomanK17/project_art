import modals from "./modules/modals";
import sliders from "./modules/sliders";
import createForms from "./modules/forms";

window.addEventListener("DOMContentLoaded", () => {
  modals();

  sliders({
    slides: ".feedback-slider-item",
    sliderDir: "",
    prevSlideBtn: ".main-prev-btn",
    nextSlideBtn: ".main-next-btn",
  });

  sliders({
    slides: ".main-slider-item",
    sliderDir: "vertical",
    prevSlideBtn: "",
    nextSlideBtn: "",
  });

  createForms();
});
