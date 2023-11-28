export function onCloseShoppingCart() {
  document.getElementById("shopping-cart").style.transform = "TranslateX(100%)";
}

export function openShoppingCart() {
  document.getElementById("shopping-cart").style.transform = "TranslateX(0%)";
}

export function addToShoppingCart(productDetails) {
  let cartItems = localStorage.getItem("cart");

  if (!cartItems) cartItems = [];
  else cartItems = JSON.parse(cartItems);

  const productInCart = cartItems.find(
    ({ id, category }) =>
      id === productDetails.id && category === productDetails.category
  );

  if (productInCart) {
    productInCart.quantity += 1;
  } else {
    cartItems.push({ ...productDetails, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cartItems));
  openShoppingCart();
  displayCartItems();
}

function changeQuantity(cartItem, type) {
  const cartItems = JSON.parse(localStorage.getItem("cart"));

  if (type === "increment") {
    localStorage.setItem(
      "cart",
      JSON.stringify(
        cartItems.map((productDetails) =>
          productDetails.id === cartItem.id &&
          productDetails.category === cartItem.category
            ? {
                ...productDetails,
                quantity: cartItem.quantity + 1,
              }
            : productDetails
        )
      )
    );
  } else {
    cartItem.quantity -= 1;

    if (!cartItem.quantity) {
      localStorage.setItem(
        "cart",
        JSON.stringify(
          cartItems.filter(
            (productDetails) =>
              productDetails.id !== cartItem.id ||
              productDetails.category !== cartItem.category
          )
        )
      );
    } else {
      localStorage.setItem(
        "cart",
        JSON.stringify(
          cartItems.map((productDetails) =>
            productDetails.id === cartItem.id &&
            productDetails.category === cartItem.category
              ? {
                  ...cartItem,
                  quantity: cartItem.quantity,
                }
              : productDetails
          )
        )
      );
    }
  }

  displayCartItems();
}

export function displayCartItems() {
  let cartItems = localStorage.getItem("cart");

  if (!cartItems) return;
  else cartItems = JSON.parse(cartItems);

  const cartItemsContainer = document.querySelector(".cart-items-container");
  cartItemsContainer.innerHTML = "";

  cartItems.forEach((cartItem) => {
    const cartItemElement = createCartItem(cartItem);
    cartItemsContainer.appendChild(cartItemElement);
  });

  setCartValue(cartItems);
}

function setCartValue(cartItems) {
  const subtotal = cartItems.reduce(
    (acc, { price, quantity }) => acc + price * quantity,
    0
  );
  document.querySelector(".subtotal-value").innerText = `${subtotal} BD`;

  document.querySelector(".total-value").innerText = `${subtotal + 12} BD`;
}

function createCartItem(cartItemDetails) {
  const cartItemContainer = document.createElement("div");
  cartItemContainer.classList.add("cart-item");

  const cartItemInfo = document.createElement("div");
  cartItemInfo.classList.add("cart-item-info");

  const cartItemQuantity = document.createElement("div");
  cartItemQuantity.classList.add("cart-item-quantity");

  const incrementQty = document.createElement("div");
  incrementQty.innerText = "+";
  incrementQty.onclick = () => changeQuantity(cartItemDetails, "increment");

  const decrementQty = document.createElement("div");
  decrementQty.innerText = "-";
  decrementQty.onclick = () => changeQuantity(cartItemDetails, "decrement");

  incrementQty.classList.add("change-btn");
  decrementQty.classList.add("change-btn");

  const qty = document.createElement("div");
  qty.classList.add("cart-item-number");
  qty.innerText = cartItemDetails.quantity;

  cartItemQuantity.appendChild(decrementQty);
  cartItemQuantity.appendChild(qty);
  cartItemQuantity.appendChild(incrementQty);

  const cartItemText = document.createElement("div");
  cartItemText.classList.add("cart-item-text");

  const cartItemName = document.createElement("div");
  cartItemName.classList.add("cart-item-name");
  cartItemName.innerText = cartItemDetails.title;

  const cartItemPrice = document.createElement("div");
  cartItemPrice.classList.add("cart-item-price");
  cartItemPrice.innerText = `${cartItemDetails.price} BD`;

  cartItemText.appendChild(cartItemName);
  cartItemText.appendChild(cartItemPrice);

  const cartItemImg = document.createElement("img");
  cartItemImg.classList.add("cart-item-img");
  cartItemImg.src = cartItemDetails.image;

  cartItemInfo.appendChild(cartItemImg);
  cartItemInfo.appendChild(cartItemText);

  cartItemContainer.appendChild(cartItemInfo);
  cartItemContainer.appendChild(cartItemQuantity);

  return cartItemContainer;
}
