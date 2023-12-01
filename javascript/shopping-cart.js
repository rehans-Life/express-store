export function openShoppingCart() {
  document.getElementById("shopping-cart").style.transform = "TranslateX(0%)";
}

export function onCloseShoppingCart() {
  document.getElementById("shopping-cart").style.transform = "TranslateX(100%)";
}

function scorllToBottom() {
  const cartItemsContainer = document.querySelector(".cart-items-container");

  cartItemsContainer.scrollTo({
    top: cartItemsContainer.scrollHeight,
    behavior: "smooth",
  });
}

export function displayCartItems() {
  let cartItems = localStorage.getItem("cart");

  if (!cartItems) cartItems = [];
  else cartItems = JSON.parse(cartItems);

  const cartItemsContainer = document.querySelector(".cart-items-container");
  cartItemsContainer.innerHTML = "";

  cartItems.forEach((cartItem) => {
    const cartItemElement = createCartItem(cartItem);
    cartItemsContainer.append(cartItemElement);
  });

  displayAmounts(cartItems);
}

function displayAmounts(cartItems) {
  const subtotal = cartItems.reduce(
    (acc, { price, quantity }) => acc + price * quantity,
    0
  );

  document.querySelector(".subtotal-value").innerText = `${subtotal} BD`;
  document.querySelector(".total-value").innerText = `${subtotal + 12} BD`;
}

function changeQuantity(product, type = "increment") {
  let cartItems = localStorage.getItem("cart");

  if (!cartItems) cartItems = [];
  else cartItems = JSON.parse(cartItems);

  let existingProduct = cartItems.find(
    ({ id, category }) => id === product.id && category === product.category
  );

  if (type === "increment") {
    existingProduct.quantity += 1;
    localStorage.setItem("cart", JSON.stringify(cartItems));
  } else {
    existingProduct.quantity -= 1;

    if (existingProduct.quantity) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    } else {
      localStorage.setItem(
        "cart",
        JSON.stringify(
          cartItems.filter(
            (cartItem) =>
              cartItem.id !== existingProduct.id ||
              cartItem.category !== existingProduct.category
          )
        )
      );
    }
  }

  displayCartItems();
}

function createCartItem(cartItemDetails) {
  const cartItemContainer = document.createElement("div");
  cartItemContainer.classList.add("cart-item");

  const cartItemImg = document.createElement("img");
  cartItemImg.src = cartItemDetails.image;
  cartItemImg.classList.add("cart-item-img");

  const cartItemInfo = document.createElement("div");
  cartItemInfo.classList.add("cart-item-info");

  const cartItemName = document.createElement("div");
  cartItemName.innerText = cartItemDetails.title;
  cartItemName.classList.add("cart-item-name");

  const cartItemPrice = document.createElement("div");
  cartItemPrice.innerText = `${cartItemDetails.price} BD`;
  cartItemPrice.classList.add("cart-item-price");

  const quantityContainer = document.createElement("div");
  quantityContainer.classList.add("quantity-container");

  const incrementBtn = document.createElement("div");
  incrementBtn.innerText = "+";
  incrementBtn.classList.add("change-btn");
  incrementBtn.onclick = () => changeQuantity(cartItemDetails);

  const itemQuantity = document.createElement("div");
  itemQuantity.innerText = cartItemDetails.quantity;
  itemQuantity.classList.add("item-quantity");

  const decrementBtn = document.createElement("div");
  decrementBtn.innerText = "-";
  decrementBtn.classList.add("change-btn");
  decrementBtn.onclick = () => changeQuantity(cartItemDetails, "decrement");

  quantityContainer.appendChild(decrementBtn);
  quantityContainer.appendChild(itemQuantity);
  quantityContainer.appendChild(incrementBtn);

  cartItemInfo.appendChild(cartItemName);
  cartItemInfo.appendChild(cartItemPrice);

  cartItemContainer.appendChild(cartItemImg);
  cartItemContainer.appendChild(cartItemInfo);
  cartItemContainer.appendChild(quantityContainer);

  return cartItemContainer;
}

export function addToCart(product) {
  let cartItems = localStorage.getItem("cart");

  if (!cartItems) cartItems = [];
  else cartItems = JSON.parse(cartItems);

  const existingProduct = cartItems.find(
    ({ id, category }) => id === product.id && category === product.category
  );

  if (existingProduct) {
    localStorage.setItem(
      "cart",
      JSON.stringify(
        cartItems.map((cartItem) =>
          cartItem.id === product.id && cartItem.category === product.category
            ? { ...existingProduct, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      )
    );
  } else {
    localStorage.setItem(
      "cart",
      JSON.stringify([...cartItems, { ...product, quantity: 1 }])
    );
  }

  displayCartItems();
  openShoppingCart();
  if (!existingProduct) scorllToBottom();
}
