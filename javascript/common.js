import { showToast } from "./toast.js";
import {
  openShoppingCart,
  onCloseShoppingCart,
  displayCartItems,
} from "./shopping-cart.js";

(async () => {
  const navbar = document.createElement("div");
  navbar.id = "navbar";

  const modalDiv = document.createElement("div");
  const shoppingCartDiv = document.createElement("div");
  const footerDiv = document.createElement("div");

  const headerHTML = await (await fetch("../components/header.html")).text();
  const modalHTML = await (await fetch("../components/modal.html")).text();
  const shoppingCartHTML = await (
    await fetch("../components/shopping-cart.html")
  ).text();
  const footerHTML = await (await fetch("../components/footer.html")).text();

  navbar.innerHTML = headerHTML;
  modalDiv.innerHTML = modalHTML;
  shoppingCartDiv.innerHTML = shoppingCartHTML;
  footerDiv.innerHTML = footerHTML;

  document.body.prepend(navbar);
  document.body.prepend(modalDiv);
  document.body.appendChild(footerDiv);
  document.body.appendChild(shoppingCartDiv);

  displayCartItems();

  const userInfo = JSON.parse(localStorage.getItem("user"));

  if (userInfo) {
    setUserInfo(userInfo);
  }

  const registerBtn = document.getElementById("register");
  const dimmer = document.getElementById("dimmer");

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

  document.getElementById("shopping-cart-close").onclick = onCloseShoppingCart;
  document.getElementById("cart-icon").onclick = openShoppingCart;

  registerBtn.onclick = onOpen;
  dimmer.onclick = onClose;
  document.getElementById("close").onclick = onClose;
  [...document.getElementsByClassName("submit")].forEach(
    (btn) => (btn.onclick = (e) => onSubmit(e, onClose))
  );
  document.getElementById("sign-out").onclick = signOut;
})();

const signOut = (_) => {
  showToast(
    "You have been successfully logged out of the system",
    "success",
    4
  );
  localStorage.removeItem("user");
  document.getElementById("register").style.display = "inline-block";
  document.getElementById("name").parentNode.style.display = "none";
};

const onSubmit = (e, onClose) => {
  e.preventDefault();

  const form = {
    "First Name": document.getElementById("firstName").value
      ? document.getElementById("firstName").value
      : document.getElementById("firstName2")?.value,
    "Last Name": document.getElementById("lastName").value
      ? document.getElementById("lastName").value
      : document.getElementById("lastName2")?.value,
    "Mobile Number": document.getElementById("mobileNumber").value
      ? document.getElementById("mobileNumber").value
      : document.getElementById("mobileNumber2")?.value,
    Email: document.getElementById("email").value
      ? document.getElementById("email").value
      : document.getElementById("email2")?.value,
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
  if (location.pathname.includes("index.html")) {
    document.getElementById("firstName2").value = "";
    document.getElementById("lastName2").value = "";
    document.getElementById("mobileNumber2").value = "";
    document.getElementById("email2").value = "";
  }
}

function setUserInfo(details) {
  const nameField = document.getElementById("name");
  nameField.innerText = `Hello, ${details["First Name"]} ${details["Last Name"]}`;
  nameField.parentNode.style.display = "flex";
  document.getElementById("register").style.display = "none";
}
