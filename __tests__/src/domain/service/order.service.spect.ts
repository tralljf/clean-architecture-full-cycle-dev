import Order from "../../../../src/domain/entity/order";
import OrderItem from "../../../../src/domain/entity/order_item";
import OrderService from "../../../../src/domain/service/order.service";
import Customer from "../../../../src/domain/entity/customer";

describe("Order Service unit test", () => {
  it("should place an order", () => {
    const item1 = new OrderItem("1", "Product 1", 10, "p1", 10);
    const item2 = new OrderItem("2", "Product 2", 5, "p2", 20);

    const customer = new Customer("1", "Customer 1");

    OrderService.placeOrder([item1, item2], customer);

    expect(customer.rewards).toBe(100);
  });

  it("should get total all ordens", () => {
    const item1 = new OrderItem("1", "Product 1", 10, "p1", 10);
    const item2 = new OrderItem("2", "Product 2", 5, "p2", 20);
    const item3 = new OrderItem("3", "Product 2", 5, "p2", 20);

    const order1 = new Order("1", "1", [item1]);
    const order2 = new Order("2", "2", [item1, item2]);
    const order3 = new Order("3", "3", [item1, item2, item3]);

    expect(OrderService.calculateTotal([order1, order2, order3])).toBe(600);
  });
});
