const createDrop = () => {
  const fileInputs: NodeListOf<HTMLInputElement> =
    document.querySelectorAll('[name = "upload"]');
  // dragenter - объект над dropArea
  // dragleave - объект за пределами dropArea
  // dragover - объект зависает над dropArea
  // drop - объект отправлен в dropArea
  ["dragenter", "dragleave", "dragover", "drop"].forEach((eventName) => {
    fileInputs.forEach((fileInput) => {
      fileInput.addEventListener(eventName, preventDefaults, false);
    });
  });

  function preventDefaults(event: Event) {
    event.preventDefault();
    event.stopPropagation(); // останавливает всплытия(bobbling)
  }

  function highlight(input: HTMLInputElement) {
    const fileUpload: HTMLElement | null = input.closest(".file_upload");
    if (fileUpload) {
      fileUpload.style.border = "5px solid yellow";
      fileUpload.style.backgroundColor = "rgba(0,0,0, .7)";
    }
  }

  function unhighlight(input: HTMLInputElement) {
    const fileUpload: HTMLElement | null = input.closest(".file_upload");
    if (fileUpload) {
      fileUpload.style.border = "none";
      fileUpload.style.backgroundColor = "#ededed";
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
      }
    });
  });
};

export default createDrop;
