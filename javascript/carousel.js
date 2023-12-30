(() => {
  const images = ["headphone", "earbuds", "speaker"];

  const carouselContainer =
    document.getElementsByClassName("carousel-container")[0];

  images.forEach((image, index) => {
    const img = new Image();

    img.src = `./images/carousel/${image}.webp`;
    img.style.width = "100%";
    img.style.transition = "all ease-out 250ms";

    if (index) img.className = "inactive-right";
    else img.className = "active";

    carouselContainer.appendChild(img);
  });

  const arrowLeft = document.getElementById("left");
  const arrowRight = document.getElementById("right");

  let curr = 0;

  function scrollRight() {
    if (curr === images.length - 1) {
      curr = 0;

      carouselContainer.childNodes.forEach((img) => {
        img.className = "inactive-right";
      });
      carouselContainer.childNodes[curr].className = "active";
    } else {
      const currChild = carouselContainer.childNodes[curr];
      currChild.className = "inactive-left";

      curr += 1;
      const nextChild = carouselContainer.childNodes[curr];
      nextChild.className = "active";
    }
  }

  function scrollLeft() {
    if (curr === 0) {
      curr = images.length - 1;
      carouselContainer.childNodes.forEach((img) => {
        img.className = "inactive-left";
      });
      carouselContainer.lastChild.className = "active";
    } else {
      const currChild = carouselContainer.childNodes[curr];
      curr -= 1;
      const nextChild = carouselContainer.childNodes[curr];

      currChild.className = "inactive-right";
      nextChild.className = "active";
    }
  }

  arrowRight.onclick = scrollRight;
  arrowLeft.onclick = scrollLeft;

  setInterval(() => {
    scrollRight();
  }, 3000);
})();
