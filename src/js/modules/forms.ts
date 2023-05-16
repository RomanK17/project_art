// import checkNumInputs from "../modules/checkNumInputs";

const createForms = () => {
  const forms = document.querySelectorAll("form");
  const inputs = document.querySelectorAll("input");
  const uploadInputs = document.querySelectorAll('[name="upload"]');

  const messageForUser = {
    loading: "Отправка данных...",
    success: "Спасибо! С вами скоро свяжутся",
    error: "Ошибка!",
    imgSpinner: "src/assets/img/spinner.gif", //картинки не подгружаются
    imgOk: "src/assets/img/ok.png",
    imgFail: "src/assets/img/fail.png",
  };
  // можно убрать, тк сервер деплою на render
  const paths = {
    designer: "../../assets/server.php",
    question: "../../assets/question.php",
  };

  // only nmbrs in this input
  //   checkNumInputs('[name="user_phone"]');

  const postData = async (url, data) => {
    let result = await fetch(url, {
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
    uploadInputs.forEach((uploadInput) => {
      const prevSibling = uploadInput.previousElementSibling;
      if (prevSibling !== null) {
        prevSibling.textContent = "Файл не выбран";
      }
    });
  };

  uploadInputs.forEach((uploadInput) => {
    uploadInput.addEventListener("input", () => {
      const imgFullName = uploadInput.files[0].name.split(".");
      let truncatedName = imgFullName[0].substring(0, 6);

      if (truncatedName.length === 6) {
        truncatedName += "..";
      }

      imgFullName[0] = `${truncatedName}.${imgFullName.pop()}`;

      if (uploadInput && uploadInput.previousElementSibling) {
        uploadInput.previousElementSibling.textContent = imgFullName;
      }
    });
  });

  forms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      let messageDiv = document.createElement("div");
      messageDiv.classList.add("status");
      form.parentNode.appendChild(messageDiv);
      form.classList.add("animated", "fadeOutUp");
      setTimeout(() => {
        form.style.display = "none";
      }, 400);

      let statusImg = document.createElement("img");
      statusImg.setAttribute("src", messageForUser.imgSpinner);
      statusImg.classList.add("animated", "fadeIntUp");
      messageDiv.append(statusImg);

      let textMessage = document.createElement("div");
      textMessage.textContent = messageForUser.loading;
      messageDiv.append(textMessage);

      const formData = new FormData(form);

      let api;
      form.closest(".popup-design") || form.classList.contains("img_form")
        ? (api = paths.designer)
        : (api = paths.question);

      let formDataObject = Object.fromEntries(formData.entries());

      postData(
        "https://server-project-art.onrender.com/api/data", // поменять ссылку на свой сервер(или вставить переменную api)

        formDataObject
      )
        .then((result) => {
          console.log(result);
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
