import { displayAmounts } from "./shopping-cart.js";
import { showToast } from "./toast.js";

let checkoutItems = localStorage.getItem("cart");

if (!checkoutItems) location.href = "/";
else checkoutItems = JSON.parse(checkoutItems);

if (!checkoutItems.length) location.href = "/";

(() => {
  document.getElementById("checkout").onclick = buyProducts;
  displayAmounts(checkoutItems);
  displayCheckoutItems(checkoutItems);
})();

function buyProducts() {
  const order = {
    orderStatus: "on the way",
    totalAmount: checkoutItems
      .reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
      .toFixed("2"),
    orderPlaced: `${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`,
    orderedItems: checkoutItems,
  };

  let orders = localStorage.getItem("orders");

  if (!orders) orders = [];
  else orders = JSON.parse(orders);

  localStorage.setItem("orders", JSON.stringify([order, ...orders]));
  localStorage.removeItem("cart");
  showToast(
    "Your order is on the way! Thank you for buying from our store",
    "success"
  );
  setTimeout(() => {
    location.href = "./orders.html";
  }, 2000);
}

function displayCheckoutItems(checkoutItems) {
  const checkoutItemsContainer = document.querySelector(".checkout-items");

  checkoutItems.forEach((item) => {
    const checkoutItemElement = buildCheckoutItem(item);
    checkoutItemsContainer.appendChild(checkoutItemElement);
  });
}

function buildCheckoutItem(checkoutItem) {
  const checkoutItemContainer = document.createElement("div");
  checkoutItemContainer.classList.add("item");

  const checkoutItemName = document.createElement("div");
  checkoutItemName.classList.add("item-name");

  const checkoutItemInfo = document.createElement("div");
  checkoutItemInfo.classList.add("item-info");

  const checkoutItemImg = document.createElement("img");
  checkoutItemImg.classList.add("photo");
  checkoutItemImg.src = checkoutItem.image;

  const itemText = document.createElement("div");
  itemText.classList.add("itemtxt");

  const itemName = document.createElement("div");
  itemName.classList.add("name");
  itemName.innerText = checkoutItem.title;

  const itemCategory = document.createElement("div");
  itemCategory.classList.add("category");
  itemCategory.innerText = checkoutItem.category;

  itemText.appendChild(itemName);
  itemText.appendChild(itemCategory);

  checkoutItemName.appendChild(checkoutItemImg);
  checkoutItemName.appendChild(itemText);

  const itemPrice = document.createElement("div");
  itemPrice.classList.add("checkout-price");
  itemPrice.innerHTML = `Price </br><span>${checkoutItem.price} BD</span>`;

  const itemQuantity = document.createElement("div");
  itemQuantity.classList.add("checkout-quantity");
  itemQuantity.innerHTML = `Quantity </br><span>${
    checkoutItem.price * checkoutItem.quantity
  }</span>`;

  const itemTotal = document.createElement("div");
  itemTotal.classList.add("checkout-total");
  itemTotal.innerHTML = `Total </br><span>${
    checkoutItem.price * checkoutItem.quantity
  } BD</span>`;

  checkoutItemInfo.appendChild(itemPrice);
  checkoutItemInfo.appendChild(itemQuantity);
  checkoutItemInfo.appendChild(itemTotal);

  checkoutItemContainer.append(checkoutItemName);
  checkoutItemContainer.append(checkoutItemInfo);

  return checkoutItemContainer;
}
