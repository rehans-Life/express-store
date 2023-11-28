import { categories, productTypes } from "../data/products-data.js";
import { addToShoppingCart } from "./shopping-cart.js";

const categoriesContainer = document.querySelector(".categories");
const productsContainer = document.querySelector(".products-grid");

categories.reverse();

let selectedCategory = "headphones";

categories.forEach((category) => {
  const button = document.createElement("button");

  const span = document.createElement("span");
  span.innerText = category;

  button.prepend(span);
  button.classList.add("black-btn");
  button.id = category;
  if (selectedCategory === category) {
    button.classList.add("selected-black-btn");
    addProducts(selectedCategory);
  }

  button.onclick = () => {
    document
      .getElementById(selectedCategory)
      .classList.remove("selected-black-btn");

    selectedCategory = category;
    button.classList.add("selected-black-btn");
    addProducts(selectedCategory);
  };

  categoriesContainer.prepend(button);
});

document.querySelector(".order").onchange = () => addProducts(selectedCategory);

function addProducts(category) {
  productsContainer.innerHTML = null;

  const order = document.querySelector(".order").value;
  const products = productTypes[category];

  console.log(order);

  if (order === "asc") {
    products.sort((productA, productB) => productA.price - productB.price);
  } else {
    products.sort((productA, productB) => productB.price - productA.price);
  }
  products.forEach((productDetails) => {
    const product = createProduct(productDetails);
    productsContainer.append(product);
  });
}

function createProduct(product) {
  const productContainer = document.createElement("div");
  productContainer.classList.add("product");

  const productImg = document.createElement("img");
  productImg.src = product.image;
  productImg.classList.add("product-image");

  const productName = document.createElement("div");
  productName.innerText = product.title;
  productName.classList.add("product-name");

  const productCategory = document.createElement("div");
  productCategory.innerText = product.category;
  productCategory.classList.add("category");

  const productOptions = document.createElement("div");
  productOptions.classList.add("product-options");

  const productPrice = document.createElement("div");
  productPrice.classList.add("price");
  productPrice.innerText = `${product.price} BD`;

  const shoppingCart = document.createElement("div");
  shoppingCart.classList.add("add-to-cart");

  const cartIcon = document.createElement("img");
  cartIcon.src = "images/icons/shopping-cart.svg";
  shoppingCart.appendChild(cartIcon);

  cartIcon.onclick = () => addToShoppingCart(product);

  productOptions.append(productPrice);
  productOptions.append(shoppingCart);

  productContainer.append(productImg);
  productContainer.append(productName);
  productContainer.append(productCategory);
  productContainer.appendChild(productOptions);

  return productContainer;
}
