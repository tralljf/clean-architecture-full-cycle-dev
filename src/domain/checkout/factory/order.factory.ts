import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import { v4 as uuidv4 } from "uuid";

interface OrderInputProps {
  customer: {
    id: string;
    name: string;
  };
  items: {
    product: {
      id: string;
      name: string;
      price: number;
    };
    quantity: number;
  }[];
}

export default class OrderFactory {
  static create(orderInput: OrderInputProps): Order {
    return new Order(
      uuidv4(),
      orderInput.customer.id,
      orderInput.items.map((item) => {
        return new OrderItem(
          uuidv4(),
          item.product.name,
          item.product.price,
          item.product.id,
          item.quantity
        );
      })
    );
  }
}
