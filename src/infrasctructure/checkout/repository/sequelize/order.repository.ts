import Order from "../../../../domain/checkout/entity/order";
import OrderModel from "./order.model";
import OrdemItemModel from "./order_item.model";
import OrderItem from "../../../../domain/checkout/entity/order_item";

export default class OrderRepository {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customer_id,
        total: entity.total(),
        items: entity.items.map((item: OrderItem) => ({
          id: item.id,
          product_id: item.product_id,
          quantity: item.quantity,
          price: item.price,
          name: item.name,
        })),
      },
      {
        include: [
          {
            model: OrdemItemModel,
          },
        ],
      }
    );
  }

  async update(entity: Order): Promise<void> {
    const oldItems = await OrdemItemModel.findAll({
      where: { order_id: entity.id },
    });

    oldItems.forEach(async (item) => {
      await item.destroy();
    });

    entity.items.forEach(async (item) => {
      await OrdemItemModel.create({
        id: item.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price,
        name: item.name,
        order_id: entity.id,
      });
    });

    await OrderModel.update(
      {
        id: entity.id,
        customer_id: entity.customer_id,
        total: entity.total(),
      },
      {
        where: { id: entity.id },
      }
    );
  }
  async findById(id: string): Promise<Order> {
    const orderModel = await OrderModel.findOne({
      where: { id },
      include: ["items"],
    });

    if (!orderModel) {
      throw new Error("Order not found");
    }

    return new Order(
      orderModel.id,
      orderModel.customer_id,
      orderModel.items.map(
        (item: OrderItem) =>
          new OrderItem(
            item.id,
            item.name,
            item.price,
            item.product_id,
            item.quantity
          )
      )
    );
  }
  async findAll(): Promise<Order[]> {
    const orderModel = await OrderModel.findAll({
      include: ["items"],
    });

    if (!orderModel) {
      return [];
    }

    return orderModel.map((order) => {
      return new Order(
        order.id,
        order.customer_id,
        order.items.map(
          (item: OrderItem) =>
            new OrderItem(
              item.id,
              item.name,
              item.price,
              item.product_id,
              item.quantity
            )
        )
      );
    });
  }
}
