(() => {
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
