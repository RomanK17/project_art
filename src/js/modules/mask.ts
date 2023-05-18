const createMaskInputs = (selector: string): void => {
  const setCursorPosition = (
    position: number,
    element: HTMLInputElement
  ): void => {
    element.focus();
    if (element.setSelectionRange)
      element.setSelectionRange(position, position);
  };

  function createPhoneMask(this: HTMLInputElement, event: Event): void {
    const matrix = "+7 (___) ___ __ __";
    let i = 0;
    const def = matrix.replace(/\D/g, ""); //версия matrix, содержащая только цифру 7
    let inputValue = this.value.replace(/\D/g, ""); //содержит введенные в поле цифры (такой формат: 732132131232), при этом 7 можно удалить. Отсюда берем цифры для замены на пустые строки("")

    if (def.length >= inputValue.length) {
      inputValue = def;
    } //делаем, чтобы +7 всегда стояла вначале ввода
    //this.value в таком формате - +7 (321) 321 31 233
    this.value = matrix.replace(/./g, (everyInputSymbol) => {
      // перебираем все символы, которые есть в матрице
      return /[_\d]/.test(everyInputSymbol) && i < inputValue.length // /[_\d]/ - любая цифра и знак _ в матрице метод test() возвращает boolean
        ? inputValue.charAt(i++) //возвращает следующий символ
        : i >= inputValue.length
        ? ""
        : everyInputSymbol; // возвращаем символ, который пришел в функцию
    });

    if (event.type === "blur") {
      if (this.value.length === 2) {
        this.value = "";
      }
    } else {
      setCursorPosition(this.value.length, this); // ставит позицию курсора на последнюю введенную цифру
    }
  }

  const inputs = document.querySelectorAll(selector);
  inputs.forEach((input): void => {
    input.addEventListener("input", createPhoneMask);
    input.addEventListener("blur", createPhoneMask);
    input.addEventListener("focus", createPhoneMask);
  });
};

export default createMaskInputs;
