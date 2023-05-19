const checkTextInputs = (selector: string) => {
  const textInputs = document.querySelectorAll(selector);

  const isKeyboardEvent = (event: Event): event is KeyboardEvent => {
    return "key" in event;
  };

  textInputs.forEach((input) => {
    input.addEventListener("keypress", function (event: Event) {
      if (isKeyboardEvent(event) && event.key.match(/[^а-яё 0-9]/gi)) {
        event.preventDefault();
      }
    });
  });
};

export default checkTextInputs;
