import { showToast } from "./toast.js";

(async () => {
  const navbar = document.createElement("div");
  navbar.id = "navbar";

  const modalDiv = document.createElement("div");
  const shoppingCartDiv = document.createElement("div");

  const headerHTML = await (await fetch("../components/header.html")).text();
  const modalHTML = await (await fetch("../components/modal.html")).text();
  const shoppingCartHTML = await (
    await fetch("../components/shopping-cart.html")
  ).text();

  navbar.innerHTML = headerHTML;
  modalDiv.innerHTML = modalHTML;
  shoppingCartDiv.innerHTML = shoppingCartHTML;

  document.body.prepend(navbar);
  document.body.prepend(modalDiv);
  document.body.prepend(shoppingCartDiv);

  const userInfo = JSON.parse(localStorage.getItem("user"));

  if (userInfo) {
    setUserInfo(userInfo);
    document.getElementById("register").style.display = "none";
  }

  const registerBtn = document.getElementById("register");
  const dimmer = document.getElementById("dimmer");
  dimmer.style.display = "none";

  const modal = [...dimmer.childNodes].find(
    (el) => el instanceof HTMLDivElement
  );

  function onOpen() {
    dimmer.style.display = "flex";

    setTimeout(() => {
      modal.classList.add("active-modal");
    }, 1);
  }

  function onClose() {
    modal.classList.remove("active-modal");
    setTimeout(() => {
      dimmer.style.display = "none";
    }, 300);
  }

  modal.onclick = (e) => {
    e.stopPropagation();
  };

  document.getElementById("shopping-cart-close").onclick = () => {
    document.getElementById("shopping-cart").style.transform =
      "TranslateX(100%)";
  };

  document.getElementById("cart-icon").onclick = () => {
    document.getElementById("shopping-cart").style.transform = "TranslateX(0%)";
  };

  registerBtn.onclick = onOpen;
  dimmer.onclick = onClose;
  document.getElementById("close").onclick = onClose;
  document.getElementById("submit").onclick = (e) => onSubmit(e, onClose);
  document.getElementById("sign-out").onclick = signOut;
})();

const signOut = (_) => {
  showToast(
    "You have been successfully logged out of the system",
    "success",
    4
  );
  document.getElementById("register").style.display = "inline-block";
  document.getElementById("name").parentNode.style.display = "none";
};

const onSubmit = (e, onClose) => {
  e.preventDefault();

  const form = {
    "First Name": document.getElementById("firstName").value,
    "Last Name": document.getElementById("lastName").value,
    "Mobile Number": document.getElementById("mobileNumber").value,
    Email: document.getElementById("email").value,
  };

  if (Object.values(form).some((value) => !value)) {
    showToast(
      `Please fill out the ${Object.keys(form).find(
        (key) => !form[key]
      )} field`,
      "error",
      4
    );
    return;
  }

  if (form["First Name"].length < 3 || form["Last Name"].length < 3) {
    showToast(
      `${
        form["First Name"].length < 3 ? "First Name" : "Last Name"
      } should be of atleast 3 characters`,
      "error",
      4
    );
    return;
  }

  if (form["Mobile Number"].length !== 8) {
    showToast("Mobile Number should of exactly 8 characters", "error", 4);
    return;
  }

  setUserInfo(form);
  document.getElementById("register").style.display = "none";

  showToast("You have been successfully logged into the system", "success", 4);

  localStorage.setItem("user", JSON.stringify(form));

  resetRegisterForm();
  onClose();
};

function resetRegisterForm() {
  document.getElementById("firstName").value = "";
  document.getElementById("lastName").value = "";
  document.getElementById("mobileNumber").value = "";
  document.getElementById("email").value = "";
}

function setUserInfo(details) {
  const nameField = document.getElementById("name");
  nameField.innerText = `Hello, ${details["First Name"]} ${details["Last Name"]}`;
  nameField.parentNode.style.display = "flex";
}
