const headerHTML = `<div class="header">
<img class="logo" onclick="location.href = './index.html'" src="./images/logo.png" />
<div class="header-options">
  <div class="links">
    <div class="link" onclick="location.href = './index.html'">HOME</div>
    <div class="link" onclick="location.href = './products.html'">
      PRODUCTS
    </div>
    <div class="link" onclick="location.href = './orders.html'">ORDERS</div>
    <div class="link" onclick="location.href = './making-of.html'">
      MAKING OF
    </div>
    <div class="link" onclick="location.href = './our-story.html'">
      OUR STORY
    </div>
  </div>
  <div class="user-options">
    <img
      id="cart-icon"
      src="./images/icons/shopping-basket.svg"
      class="white-icon"
    />
    <button id="register" class="white-btn">
      <span>Register</span>
    </button>
    <div class="user-info">
      <div id="name" class="name"></div>
      <div id="sign-out" class="sign-out">Sign out</div>
    </div>
  </div>
</div>
</div>
`;

const footerHTML = `<div class="footer">
<div class="about-us">
  Express yourself through vibrant sound with Express, your one-stop shop for
  premium headphones, earbuds, and speakers! Dive into a sea of crisp melodies
  and powerful bass lines, all meticulously curated to elevate your listening
  experience.
</div>
<div class="external-links">
  <div class="links">
    <div class="link">Contact Us</div>
    <div class="link">About</div>
    <div class="link">Location</div>
    <div class="link">Orders</div>
    <div class="link">Careers</div>
    <div class="link">Status</div>
    <div class="link">Help</div>
  </div>
</div>
<div class="socials">
  <div class="socials-head">Follow Us</div>
  <div class="social-logos">
    <img class="white-icon" src="./images/icons/facebook.svg" />
    <img class="white-icon" src="./images/icons/instagram.svg" />
    <img class="white-icon" src="./images/icons/twitter.svg" />
    <img class="white-icon" src="./images/icons/youtube.svg" />
  </div>
</div>
</div>
`;

const modalHTML = `<div id="dimmer">
<div class="modal">
  <div id="close" class="close-icon">
    <img src="./images/icons/close.svg" />
  </div>
  <h1>Register</h1>
  <form class="input-grid registerForm">
    <div class="input-container">
      <label>First Name</label>
      <input name="firstName" class="firstName" />
    </div>
    <div class="input-container">
      <label>Last Name</label>
      <input name="lastName" class="lastName" />
    </div>
    <div class="input-container">
      <label>Mobile Number</label>
      <input name="mobileNumber" class="mobileNumber" />
    </div>
    <div class="input-container">
      <label>Email</label>
      <input name="email" class="email" />
    </div>
    <div>
      <button class="black-btn submit">
        <span>Register</span>
      </button>
    </div>
  </form>
</div>
</div>
`;

const shoppingCartHTML = `<div id="shopping-cart" class="shopping-cart-container">
<div id="shopping-cart-close" class="close-icon">
  <img src="./images/icons/close.svg" />
</div>
<div class="shopping-cart-header">Cart</div>
<div class="cart-content">
  <div class="cart-items-container"></div>
  <div class="empty-cart-container">
    <img src="./images/emptyCart.svg" />
    <div class="empty-cart-text">Add some items to your cart</div>
  </div>
</div>
<div class="cart-items-total">
  <div class="subtotal amount">
    <span>Sub Total</span>
    <span class="subtotal-value"></span>
  </div>
  <div class="delivery amount">
    <span>Delivery</span>
    <span class="delivery-value">12 BD</span>
  </div>
  <div class="divider"></div>
  <div class="total amount">
    <span>Total</span>
    <span class="total-value"></span>
  </div>
  <button class="check-out">Checkout</button>
</div>
</div>
`;

(() => {
  const orders = localStorage.getItem("orders");
  if (!orders) {
    localStorage.setItem("orders", JSON.stringify(defaultOrders));
  }

  const navbar = document.createElement("div");
  navbar.id = "navbar";

  const modalDiv = document.createElement("div");
  const shoppingCartDiv = document.createElement("div");
  const footerDiv = document.createElement("div");

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
  document.querySelector(".check-out").onclick = toCheckout;

  registerBtn.onclick = onOpen;
  dimmer.onclick = onClose;
  document.getElementById("close").onclick = onClose;
  [...document.getElementsByClassName("registerForm")].forEach(
    (form) => (form.onsubmit = (e) => onSubmit(e, onClose))
  );
  document.getElementById("sign-out").onclick = signOut;
})();

function toCheckout() {
  let checkoutItems = localStorage.getItem("cart");

  if (!checkoutItems) {
    showToast("Please add items to your cart before checkout", "error");
    return;
  } else checkoutItems = JSON.parse(checkoutItems);

  if (!checkoutItems.length) {
    showToast("Please add items to your cart before checkout", "error");
    return;
  }

  location.href = "./checkout.html";
}

function signOut(_) {
  showToast(
    "You have been successfully logged out of the system",
    "success",
    4
  );
  localStorage.removeItem("user");
  document.getElementById("register").style.display = "inline-block";
  document.getElementById("name").parentNode.style.display = "none";
}

function onSubmit(e, onClose) {
  e.preventDefault();

  const formEl = e.target;

  const form = {
    "First Name": formEl.querySelector(".firstName")?.value,
    "Last Name": formEl.querySelector(".lastName")?.value,
    "Mobile Number": formEl.querySelector(".mobileNumber")?.value,
    Email: formEl.querySelector(".email")?.value,
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

  if (Number.isNaN(parseInt(form["Mobile Number"]))) {
    showToast("Please enter a valid number", "error", 4);
    return;
  }

  if (!form["Email"].includes("@")) {
    showToast("Please enter a valid email with '@'symbol", "error", 4);
    return;
  }

  setUserInfo(form);

  showToast("You have been successfully logged into the system", "success", 4);

  localStorage.setItem("user", JSON.stringify(form));

  resetRegisterForm(formEl);
  onClose();
}

function resetRegisterForm(formEl) {
  formEl.querySelector(".firstName").value = "";
  formEl.querySelector(".lastName").value = "";
  formEl.querySelector(".mobileNumber").value = "";
  formEl.querySelector(".email").value = "";
}

function setUserInfo(details) {
  const nameField = document.getElementById("name");
  nameField.innerText = `Hello, ${details["First Name"]} ${details["Last Name"]}`;
  nameField.parentNode.style.display = "flex";
  document.getElementById("register").style.display = "none";
}
