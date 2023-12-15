function loadOrders() {
  let orders = localStorage.getItem("orders");
  if (orders) {
    orders = JSON.parse(orders);
    displayOrderItems();
    function displayOrderItems() {
      const ordersContainer = document.querySelector(".orders-container");

      orders.forEach((order) => {
        const orderEl = createOrderElement(order);
        ordersContainer.append(orderEl);
      });
    }

    function createOrderElement(order) {
      const orderContainer = document.createElement("div");
      orderContainer.classList.add("order-container");

      const orderInfoContainer = document.createElement("div");
      orderInfoContainer.classList.add("order-info");

      const orderInfos = [
        {
          label: "Order Placed",
          value: order.orderPlaced,
        },
        {
          label: "Order Status",
          value: order.orderStatus,
        },
        {
          label: "Total Amount",
          value: order.totalAmount,
        },
      ];

      orderInfos.forEach((orderInfo) => {
        const infoItemContainer = document.createElement("div");
        infoItemContainer.classList.add("info-item");

        const label = document.createElement("div");
        label.classList.add("label");
        label.innerText = `${orderInfo.label}:`;

        const value = document.createElement("div");
        value.classList.add("value");
        value.innerText = orderInfo.value;

        if (orderInfo.label === "Order Status") {
          value.style.color =
            orderInfo.value === "Completed" ? "#6ee43f" : "#d9e43f";
        }

        infoItemContainer.appendChild(label);
        infoItemContainer.appendChild(value);

        orderInfoContainer.appendChild(infoItemContainer);
      });

      const orderItemsContainer = document.createElement("div");
      orderItemsContainer.classList.add("order-items");

      order.orderedItems.forEach((item) => {
        const itemContainer = document.createElement("div");
        itemContainer.classList.add("order-item");

        const itemImg = document.createElement("img");
        itemImg.classList.add("item-img");
        itemImg.src = item.image;

        const itemInfoContainer = document.createElement("div");
        itemInfoContainer.classList.add("item-info");

        const itemName = document.createElement("div");
        const category = document.createElement("div");
        const itemValue = document.createElement("div");

        itemName.classList.add("item-name");
        category.classList.add("category");
        itemValue.classList.add("item-value");

        itemName.innerText = item.title;
        category.innerText = item.category;
        itemValue.innerText = `${item.price} BD x ${item.quantity}`;

        itemInfoContainer.appendChild(itemName);
        itemInfoContainer.appendChild(category);
        itemInfoContainer.appendChild(itemValue);

        itemContainer.appendChild(itemImg);
        itemContainer.appendChild(itemInfoContainer);

        orderItemsContainer.appendChild(itemContainer);
      });

      orderContainer.appendChild(orderInfoContainer);
      orderContainer.appendChild(orderItemsContainer);

      return orderContainer;
    }
  }
}
