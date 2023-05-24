const createCalc = ({
  sizeSelector,
  materialsSelector,
  optionsSelector,
  promocodeSelector,
  resultSelector,
}: {
  sizeSelector: string;
  materialsSelector: string;
  optionsSelector: string;
  promocodeSelector: string;
  resultSelector: string;
}): void => {
  const sizeBlock: HTMLOptionElement | null =
    document.querySelector(sizeSelector);
  const materialsBlock: HTMLOptionElement | null =
    document.querySelector(materialsSelector);
  const optionsBlock: HTMLOptionElement | null =
    document.querySelector(optionsSelector);
  const promocodeBlock: HTMLInputElement | null =
    document.querySelector(promocodeSelector);
  const resultBlock: HTMLDivElement | null =
    document.querySelector(resultSelector);

  if (
    sizeBlock &&
    materialsBlock &&
    optionsBlock &&
    promocodeBlock &&
    resultBlock
  ) {
    let sum = 0;

    const calcResult = (): void => {
      sum = Math.round(
        +sizeBlock.value * +materialsBlock.value + +optionsBlock.value
      );

      if (sizeBlock.value == "" || materialsBlock.value == "") {
        resultBlock.innerHTML = "Выберит размер и материал картины";
      } else if (promocodeBlock.value === "IWANTPOPART") {
        resultBlock.innerHTML = Math.round(sum * 0.7).toString();
      } else {
        resultBlock.innerHTML = sum.toString();
      }
    };

    sizeBlock.addEventListener("change", calcResult);
    materialsBlock.addEventListener("change", calcResult);
    optionsBlock.addEventListener("change", calcResult);
    promocodeBlock.addEventListener("input", calcResult);
  }
};

export default createCalc;
