import Order from "../entity/order";
import OrderFactory from "./order.factory";

describe("Order Factory unit Test", () => {
  it("should create an order", () => {
    const orderInput = {
      customer: {
        name: "Customer A",
        id: "customer-1",
      },
      items: [
        {
          product: {
            id: "product-1",
            name: "Product 1",
            price: 100,
          },
          quantity: 2,
        },
        {
          product: {
            id: "product-2",
            name: "Product 2",
            price: 200,
          },
          quantity: 1,
        },
      ],
    };

    const order = OrderFactory.create(orderInput);
    expect(order).toBeInstanceOf(Order);

    expect(order.id).toBeDefined();
    expect(order.customer_id).toBe("customer-1");
    expect(order.total()).toBe(400);
  });
});
