const checkTextInputs = (selector) => {
  const textInputs = document.querySelectorAll(selector);

  textInputs.forEach((input) => {
    input.addEventListener("keypress", function (event) {
      if (event.key.match(/[^а-яё 0-9]/gi)) {
        event.preventDefault();
      }
    });
  });
};

export default checkTextInputs;
