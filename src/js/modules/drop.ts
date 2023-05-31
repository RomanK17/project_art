const createDrop = () => {
  const fileInputs: NodeListOf<HTMLInputElement> =
    document.querySelectorAll('[name = "upload"]');
  ["dragenter", "dragleave", "dragover", "drop"].forEach((eventName) => {
    fileInputs.forEach((fileInput) => {
      fileInput.addEventListener(eventName, handleEvent, false);
    });
  });

  function handleEvent(event: Event) {
    event.preventDefault();
    event.stopPropagation(); // останавливает всплытия(bobbling)
  }

  function highlight(input: HTMLInputElement) {
    const fileUpload: HTMLElement | null = input.closest(".file_upload");
    if (fileUpload) {
      fileUpload.style.border = "3px solid yellow";
      fileUpload.style.backgroundColor = "rgba(0,0,0, .7)";
    }
  }

  function unhighlight(input: HTMLInputElement) {
    const fileUpload: HTMLElement | null = input.closest(".file_upload");
    if (fileUpload) {
      fileUpload.style.border = "3px solid transparent";
      if (input.closest(".img_form")) {
        fileUpload.style.backgroundColor = "#ffffff";
      } else {
        fileUpload.style.backgroundColor = "#ededed";
      }
    }
  }

  ["dragenter", "dragover"].forEach((eventName) => {
    fileInputs.forEach((fileInput) => {
      fileInput.addEventListener(eventName, () => highlight(fileInput), false);
    });
  });

  ["dragleave", "drop"].forEach((eventName) => {
    fileInputs.forEach((fileInput) => {
      fileInput.addEventListener(
        eventName,
        () => unhighlight(fileInput),
        false
      );
    });
  });

  fileInputs.forEach((input) => {
    input.addEventListener("drop", (event) => {
      if (event.dataTransfer) {
        input.files = event.dataTransfer.files; //input.files - файлы, которые загрузил пользователь
        //event.dataTransfer.files - объект с файлом

        const imgFullName = input.files[0].name.split(".");
        let truncatedName = imgFullName[0].substring(0, 6);

        if (truncatedName.length === 6) {
          truncatedName += "..";
        }

        imgFullName[0] = `${truncatedName}.${imgFullName.pop()}`;

        if (input && input.previousElementSibling) {
          input.previousElementSibling.textContent = imgFullName.join(".");
        }
      }
    });
  });
};

export default createDrop;
