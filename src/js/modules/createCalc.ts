const createCalc = ({
  sizeSelector,
  materialsSelector,
  optionsSelector,
  promocodeSelector,
  resultSelector,
}): void => {
  const sizeBlock = document.querySelector(sizeSelector);
  const materialsBlock = document.querySelector(materialsSelector);
  const optionsBlock = document.querySelector(optionsSelector);
  const promocodeBlock = document.querySelector(promocodeSelector);
  const resultBlock = document.querySelector(resultSelector);

  let sum = 0;

  const calcResult = (): void => {
    sum = Math.round(
      +sizeBlock.value * +materialsBlock.value + +optionsBlock.value
    );

    if (sizeBlock.value == "" || materialsBlock.value == "") {
      resultBlock.innerHTML = "Выберит размер и материал картины";
    } else if (promocodeBlock.value === "IWANTPOPART") {
      resultBlock.innerHTML = Math.round(sum * 0.7);
    } else {
      resultBlock.innerHTML = sum;
    }
  };

  sizeBlock.addEventListener("change", calcResult);
  materialsBlock.addEventListener("change", calcResult);
  optionsBlock.addEventListener("change", calcResult);
  promocodeBlock.addEventListener("input", calcResult);
};

export default createCalc;
