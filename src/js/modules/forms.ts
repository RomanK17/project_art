const createForms = (): void => {
  const forms = document.querySelectorAll("form");
  const inputs = document.querySelectorAll("input");
  const uploadImageInputs =
    document.querySelectorAll<HTMLInputElement>('[name="upload"]');

  const messageForUser = {
    loading: "Отправка данных...",
    success: "Спасибо! С вами скоро свяжутся",
    error: "Ошибка!",
    imgSpinner: document.querySelector<HTMLImageElement>(".img_spinner"),
    imgOk: document.querySelector<HTMLImageElement>(".img-ok"),
    imgFail: document.querySelector<HTMLImageElement>(".img-fail"),
  };

  const postData = async (url: string, data: {}): Promise<void> => {
    await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const clearInputs = (): void => {
    inputs.forEach((input) => (input.value = ""));
    uploadImageInputs.forEach((uploadInput) => {
      const prevSibling = uploadInput.previousElementSibling;
      if (prevSibling !== null) {
        prevSibling.textContent = "Файл не выбран";
      }
    });
  };

  uploadImageInputs.forEach((uploadInput: HTMLInputElement): void => {
    uploadInput.addEventListener("input", (): void => {
      if (uploadInput.files) {
        const imgFullName = uploadInput.files[0].name.split(".");
        let truncatedName = imgFullName[0].substring(0, 6);

        if (truncatedName.length === 6) {
          truncatedName += "..";
        }

        imgFullName[0] = `${truncatedName}.${imgFullName.pop()}`;

        if (uploadInput && uploadInput.previousElementSibling) {
          uploadInput.previousElementSibling.textContent =
            imgFullName.join(".");
        }
      }
    });
  });

  forms.forEach((form): void => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const messageDiv = document.createElement("div");
      messageDiv.classList.add("status");
      if (form.parentNode) form.parentNode.appendChild(messageDiv);
      form.classList.add("animated", "fadeOutUp");
      setTimeout(() => {
        form.style.display = "none";
      }, 400);

      if (messageForUser.imgSpinner) {
        messageForUser.imgSpinner.style.display = "inline";
        if (
          messageForUser.imgSpinner &&
          messageForUser.imgOk &&
          messageForUser.imgFail
        ) {
          messageDiv.append(
            messageForUser.imgSpinner,
            messageForUser.imgOk,
            messageForUser.imgFail
          );
        }
      }

      const textMessage = document.createElement("div");
      textMessage.textContent = messageForUser.loading;
      messageDiv.append(textMessage);

      const formData = new FormData(form);

      const formDataObject = Object.fromEntries(formData.entries());

      postData(
        "https://server-project-art.onrender.com/api/data",
        formDataObject
      )
        .then(() => {
          if (messageForUser.imgSpinner)
            messageForUser.imgSpinner.style.display = "none";
          if (messageForUser.imgOk)
            messageForUser.imgOk.style.display = "inline";
          textMessage.textContent = messageForUser.success;
        })
        .catch(() => {
          if (messageForUser.imgSpinner)
            messageForUser.imgSpinner.style.display = "none";
          if (messageForUser.imgFail)
            messageForUser.imgFail.style.display = "inline";
          textMessage.textContent = messageForUser.error;
        })
        .finally(() => {
          clearInputs();
          setTimeout(() => {
            messageDiv.remove();
            form.style.display = "block";
            form.classList.remove("fadeOutUp");
            form.classList.add("fadeInUp");
          }, 30000);
        });
    });
  });
};

export default createForms;
