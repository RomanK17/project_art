const createForms = () => {
  const forms = document.querySelectorAll("form");
  const inputs = document.querySelectorAll("input");
  const uploadImageInputs =
    document.querySelectorAll<HTMLInputElement>('[name="upload"]');

  const messageForUser = {
    loading: "Отправка данных...",
    success: "Спасибо! С вами скоро свяжутся",
    error: "Ошибка!",
    imgSpinner: "./src/assets/img/spinner.gif",
    imgOk: "./src/assets/img/ok.png",
    imgFail: "./src/assets/img/fail.png",
  };

  const postData = async (url: string, data: {}) => {
    const result = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await result.text();
  };

  const clearInputs = () => {
    inputs.forEach((input) => (input.value = ""));
    uploadImageInputs.forEach((uploadInput) => {
      const prevSibling = uploadInput.previousElementSibling;
      if (prevSibling !== null) {
        prevSibling.textContent = "Файл не выбран";
      }
    });
  };

  uploadImageInputs.forEach((uploadInput: HTMLInputElement) => {
    uploadInput.addEventListener("input", () => {
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

  forms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const messageDiv = document.createElement("div");
      messageDiv.classList.add("status");
      if (form.parentNode) form.parentNode.appendChild(messageDiv);
      form.classList.add("animated", "fadeOutUp");
      setTimeout(() => {
        form.style.display = "none";
      }, 400);

      const statusImg = document.createElement("img");
      statusImg.setAttribute("src", messageForUser.imgSpinner);
      statusImg.classList.add("animated", "fadeIntUp");
      messageDiv.append(statusImg);

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
          statusImg.setAttribute("src", messageForUser.imgOk);
          textMessage.textContent = messageForUser.success;
        })
        .catch(() => {
          statusImg.setAttribute("src", messageForUser.imgFail);
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
