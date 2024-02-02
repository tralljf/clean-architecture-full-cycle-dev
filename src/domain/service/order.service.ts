import Customer from "../entity/customer";
import Order from "../entity/order";
import OrderItems from "../entity/order_item";
import { v4 as uuidv4 } from "uuid";

export default class OrderService {
  static calculateTotal(orders: Order[]) {
    return orders.reduce((acc, order) => {
      return acc + order.total();
    }, 0);
  }

  static placeOrder(items: OrderItems[], customer: Customer): Order {
    if (items.length === 0) {
      throw new Error("Order needs to have at least one item.");
    }

    if (!customer) {
      throw new Error("Order needs to have a customer.");
    }

    const order = new Order(uuidv4(), customer.id, items);
    customer.addRewardsPoints(order.total() / 2);

    return order;
  }
}
