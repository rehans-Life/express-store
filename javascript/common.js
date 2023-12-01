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

function inputWithValue(query) {
  return [...document.querySelectorAll(query)].reduce((acc, curr) => {
    return curr.value ? curr : acc;
  }, null);
}

function onSubmit(e, onClose) {
  e.preventDefault();

  const form = {
    "First Name": inputWithValue(".firstName").value,
    "Last Name": inputWithValue(".lastName").value,
    "Mobile Number": inputWithValue(".mobileNumber").value,
    Email: inputWithValue(".email").value,
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
}

function resetRegisterForm() {
  inputWithValue(".firstName").value = "";
  inputWithValue(".lastName").value = "";
  inputWithValue(".mobileNumber").value = "";
  inputWithValue(".email").value = "";
}

function setUserInfo(details) {
  const nameField = document.getElementById("name");
  nameField.innerText = `Hello, ${details["First Name"]} ${details["Last Name"]}`;
  nameField.parentNode.style.display = "flex";
  document.getElementById("register").style.display = "none";
}
