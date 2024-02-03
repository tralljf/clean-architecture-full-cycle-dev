import OrderItem from "./order_item";

describe("OrderItem test", () => {
  it("should create an order item", () => {
    const orderItem = new OrderItem("1", "Product 1", 10, "1", 1);
    expect(orderItem).toBeInstanceOf(OrderItem);
  });
});
