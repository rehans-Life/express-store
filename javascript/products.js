let selectedCategory = categories[0];

function loadProducts() {
  const categoriesContainer = document.querySelector(".categories");

  if (categoriesContainer) {
    categories.reverse();

    categories.forEach((category) => {
      const btn = document.createElement("button");
      btn.classList.add("black-btn");
      btn.id = category;

      const btnText = document.createElement("span");
      btnText.innerText = category;
      btn.appendChild(btnText);

      if (selectedCategory === category) {
        displayProducts(category);
        btn.classList.add("selected-black-btn");
      }

      btn.onclick = () => {
        document
          .getElementById(selectedCategory)
          .classList.remove("selected-black-btn");

        selectedCategory = category;
        btn.classList.add("selected-black-btn");
        displayProducts(category);
      };

      categoriesContainer.prepend(btn);
    });
  }

  const orderSelect = document.querySelector(".order");
  if (orderSelect) orderSelect.onchange = displayProducts;
}

function displayProducts() {
  const products = productTypes[selectedCategory];
  const order = document.querySelector(".order").value;
  const productsContainer = document.querySelector(".products-grid");
  productsContainer.innerHTML = "";

  if (order === "asc") {
    products.sort((productA, productB) => productA.price - productB.price);
  } else {
    products.sort((productA, productB) => productB.price - productA.price);
  }

  products.forEach((product) => {
    const productCard = createProduct(product);
    productsContainer.append(productCard);
  });
}

function createProduct(productDetails) {
  const productContainer = document.createElement("div");
  productContainer.classList.add("product");

  const productImg = document.createElement("img");
  productImg.src = productDetails.image;
  productImg.classList.add("product-img");

  const productName = document.createElement("div");
  productName.innerText = productDetails.title;
  productName.classList.add("product-name");

  const productCategory = document.createElement("div");
  productCategory.innerText = productDetails.category;
  productCategory.classList.add("product-category");

  const productOptions = document.createElement("div");
  productOptions.classList.add("product-options");

  const productPrice = document.createElement("div");
  productPrice.classList.add("product-price");
  productPrice.innerText = `${productDetails.price} BD`;

  const shoppingCartBtn = document.createElement("div");
  shoppingCartBtn.classList.add("shopping-cart-btn");
  const shoppingCartImg = document.createElement("img");
  shoppingCartImg.src = "./images/icons/shopping-cart.svg";
  shoppingCartBtn.appendChild(shoppingCartImg);

  shoppingCartBtn.onclick = () => addToCart(productDetails);

  productOptions.appendChild(productPrice);
  productOptions.appendChild(shoppingCartBtn);

  productContainer.appendChild(productImg);
  productContainer.appendChild(productName);
  productContainer.appendChild(productCategory);
  productContainer.appendChild(productOptions);

  return productContainer;
}
