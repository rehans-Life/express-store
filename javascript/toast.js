const showToast = (message, type, time = 2) => {
  const toast = document.createElement("div");

  toast.innerText = message;
  toast.classList.add("toast");

  if (type === "success") toast.classList.add("toast-success");
  else toast.classList.add("toast-error");

  const toastContainer = document.createElement("div");
  toastContainer.classList.add("toast-container");

  toastContainer.appendChild(toast);

  const existingToastContainer = [...document.body.childNodes].find((node) =>
    node.classList?.contains("toast-container")
  );

  if (existingToastContainer) {
    existingToastContainer.remove();
  }

  document.body.prepend(toastContainer);

  let isAlreadyClosed = false;

  const onClose = () => {
    if (isAlreadyClosed) return;

    isAlreadyClosed = true;
    toast.classList.add("close-toast");

    setTimeout(() => {
      toastContainer.remove();
    }, 100);
  };

  toastContainer.onclick = onClose;

  setTimeout(onClose, time * 1000);
};
