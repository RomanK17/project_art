import modals from "./modules/modals";
import sliders from "./modules/sliders";
import createForms from "./modules/forms";
import createMaskInputs from "./modules/mask";
import checkTextInputs from "./modules/checkTextInputs";
import showMoreCards from "./modules/showMoreCards";
import createCalc from "./modules/createCalc";
import filterImages from "./modules/filterImages";
import replaceWithImageOnHover from "./modules/replaceWithImg";
import createAccordion from "./modules/accordion-menu";
import createBurger from "./modules/burger";
import createSmoothScroll from "./modules/scrolling";

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

  createMaskInputs('[name = "phone"]');

  checkTextInputs('[name="name"]');
  checkTextInputs('[name="message"]');

  showMoreCards(".button-styles", "#styles .row");

  createCalc({
    sizeSelector: "#size",
    materialsSelector: "#material",
    optionsSelector: "#options",
    promocodeSelector: ".promocode",
    resultSelector: ".calc-price",
  });

  filterImages();

  replaceWithImageOnHover(".sizes-block");

  createAccordion(".accordion-heading");

  createBurger(".burger-menu", ".burger");

  createSmoothScroll(".pageup");
});
