import { productBundles } from "../data/products-data.js";
import { createProduct } from "./products.js";

(() => {
  displayProductBundles();

  const productTypes = [...document.getElementsByClassName("product-type")];

  productTypes.forEach((productType) => {
    const productsContainer = productType.querySelector(".products");

    const navigatorLeft = productType.querySelector(".product-navigator-left");
    const navigatorRight = productType.querySelector(
      ".product-navigator-right"
    );

    navigatorLeft.onclick = () => {
      console.log(
        parseInt(getComputedStyle(productsContainer).columnGap.replace("px"))
      );

      productsContainer.scrollLeft -=
        productsContainer.firstElementChild.scrollWidth +
        parseInt(getComputedStyle(productsContainer).columnGap.replace("px"));
    };

    navigatorRight.onclick = () => {
      productsContainer.scrollLeft +=
        productsContainer.firstElementChild.scrollWidth +
        parseInt(getComputedStyle(productsContainer).columnGap.replace("px"));
    };
  });
})();

function displayProductBundles() {
  const productTypesContainer = document.querySelector(".product-types");

  Object.entries(productBundles).forEach(([heading, products]) => {
    const prouctTypeContainer = createProductType(heading, products);
    productTypesContainer.appendChild(prouctTypeContainer);
  });
}

function createProductType(heading, products) {
  const productTypeContainer = document.createElement("div");
  productTypeContainer.classList.add("product-type");

  const productTypeOptions = document.createElement("div");
  productTypeOptions.classList.add("type-options");

  const productTypeHeading = document.createElement("div");
  productTypeHeading.classList.add("type-heading");
  productTypeHeading.innerText = heading;

  const productsContainer = document.createElement("div");
  productsContainer.classList.add("products");

  productTypeOptions.appendChild(productTypeHeading);
  productTypeOptions.appendChild(createNavigator());

  productTypeContainer.appendChild(productTypeOptions);
  productTypeContainer.appendChild(productsContainer);

  products.forEach((product) => {
    const productEl = createProduct(product);
    productsContainer.append(productEl);
  });

  return productTypeContainer;
}

function createNavigator() {
  const navigatorsContaniner = document.createElement("div");
  navigatorsContaniner.classList.add("navigators");

  const navigators = ["left", "right"];

  navigators.forEach((navigator) => {
    const navigatorEl = document.createElement("div");

    navigatorEl.classList.add("product-navigator");
    navigatorEl.classList.add(`product-navigator-${navigator}`);

    const navigatorImg = document.createElement("img");
    navigatorImg.src = `./images/icons/chevron-${navigator}.svg`;

    navigatorEl.appendChild(navigatorImg);
    navigatorsContaniner.appendChild(navigatorEl);
  });

  return navigatorsContaniner;
}
