import Order from "../../../../src/domain/entity/order";
import OrderItem from "../../../../src/domain/entity/order_item";

describe("OrderItem test", () => {
  it("should create an order", () => {
    const order = new Order("1", "1", []);
    expect(order).toBeInstanceOf(Order);
  });

  it("should calculate the total", () => {
    const item1 = new OrderItem("1", "Product 1", 10, "p1", 10);
    const item2 = new OrderItem("2", "Product 2", 5, "p2", 20);

    const order = new Order("1", "Compra 1", [item1, item2]);
    expect(order.total()).toBe(200);
  });
});
