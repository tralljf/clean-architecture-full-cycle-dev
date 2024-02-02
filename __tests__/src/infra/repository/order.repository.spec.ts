import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../../src/infra/db/sequelize/model/customer.model";
import OrderModel from "../../../../src/infra/db/sequelize/model/order.model";
import OrderItemModel from "../../../../src/infra/db/sequelize/model/order_item.model";
import ProductModel from "../../../../src/infra/db/sequelize/model/product.model";
import Address from "../../../../src/domain/entity/address";
import Customer from "../../../../src/domain/entity/customer";
import CustomerRepository from "../../../../src/domain/repository/customer.repository";
import Product from "../../../../src/domain/entity/product";
import ProductRepository from "../../../../src/domain/repository/product.repository";
import OrderItem from "../../../../src/domain/entity/order_item";
import OrderRepository from "../../../../src/domain/repository/order.repository";
import Order from "../../../../src/domain/entity/order";

describe("OrderRepository", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([
      CustomerModel,
      OrderModel,
      ProductModel,
      OrderItemModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a Order", async () => {
    const customerRepository = new CustomerRepository();
    const address = new Address("Street 1", "City 1", "12345", "Country 1");
    const customer = new Customer("1", "John Doe", address);

    await customerRepository.create(customer);

    const product = new Product("1", "Product 1", 10);
    const productRepository = new ProductRepository();
    await productRepository.create(product);

    const items1 = new OrderItem("1", "item 1", 10, "1", 10);
    const items2 = new OrderItem("2", "item 2", 10, "1", 5);

    const orderRepository = new OrderRepository();

    const order = new Order("1", "1", [items1, items2]);
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel).not.toBeNull();
    expect(orderModel?.toJSON()).toStrictEqual({
      id: "1",
      customer_id: "1",
      total: 150,
      items: [
        {
          id: "1",
          order_id: "1",
          name: "item 1",
          price: 10,
          product_id: "1",
          quantity: 10,
        },
        {
          id: "2",
          order_id: "1",
          name: "item 2",
          price: 10,
          product_id: "1",
          quantity: 5,
        },
      ],
    });
  });

  it("should find order by id", async () => {
    const customerRepository = new CustomerRepository();
    const address = new Address("Street 1", "City 1", "12345", "Country 1");
    const customer = new Customer("1", "John Doe", address);

    await customerRepository.create(customer);

    const product = new Product("1", "Product 1", 10);
    const productRepository = new ProductRepository();
    await productRepository.create(product);

    const items1 = new OrderItem("1", "item 1", 10, "1", 10);
    const items2 = new OrderItem("2", "item 2", 10, "1", 5);

    const orderRepository = new OrderRepository();

    const order = new Order("1", "1", [items1, items2]);
    await orderRepository.create(order);

    const find_order = await orderRepository.findById("1");

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel).not.toBeNull();
    expect(find_order).not.toBeNull();
    expect(find_order).toStrictEqual(order);
  });

  it("should not find order by id", async () => {
    const orderRepository = new OrderRepository();
    await expect(orderRepository.findById("1")).rejects.toThrow(
      "Order not found"
    );
  });

  it("should find all orders", async () => {
    const customerRepository = new CustomerRepository();
    const address = new Address("Street 1", "City 1", "12345", "Country 1");
    const customer = new Customer("1", "John Doe", address);

    await customerRepository.create(customer);

    const product = new Product("1", "Product 1", 10);
    const productRepository = new ProductRepository();
    await productRepository.create(product);

    const items1 = new OrderItem("1", "item 1", 10, "1", 10);
    const items2 = new OrderItem("2", "item 2", 10, "1", 5);
    const items3 = new OrderItem("3", "item 3", 10, "1", 5);

    const orderRepository = new OrderRepository();

    const order1 = new Order("1", "1", [items1, items2]);
    const order2 = new Order("2", "1", [items3]);
    await orderRepository.create(order1);
    await orderRepository.create(order2);

    const orders = await orderRepository.findAll();

    expect(orders).toStrictEqual([order1, order2]);
  });

  it("should update a Order", async () => {
    const customerRepository = new CustomerRepository();
    const address = new Address("Street 1", "City 1", "12345", "Country 1");
    const customer = new Customer("1", "John Doe", address);

    await customerRepository.create(customer);

    const product = new Product("1", "Product 1", 10);
    const productRepository = new ProductRepository();
    await productRepository.create(product);

    const items1 = new OrderItem("1", "item 1", 10, "1", 10);
    const items2 = new OrderItem("2", "item 2", 10, "1", 5);

    const orderRepository = new OrderRepository();

    const order = new Order("1", "1", [items1, items2]);
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel).not.toBeNull();
    expect(orderModel?.toJSON()).toStrictEqual({
      id: "1",
      customer_id: "1",
      total: 150,
      items: [
        {
          id: "1",
          order_id: "1",
          name: "item 1",
          price: 10,
          product_id: "1",
          quantity: 10,
        },
        {
          id: "2",
          order_id: "1",
          name: "item 2",
          price: 10,
          product_id: "1",
          quantity: 5,
        },
      ],
    });

    const items3 = new OrderItem("3", "item 3", 10, "1", 5);
    order.changeItems([items3]);
    await orderRepository.update(order);

    const orderModelUpdated = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModelUpdated).not.toBeNull();
    expect(orderModelUpdated?.toJSON()).toStrictEqual({
      id: "1",
      customer_id: "1",
      total: 50,
      items: [
        {
          id: "3",
          order_id: "1",
          name: "item 3",
          price: 10,
          product_id: "1",
          quantity: 5,
        },
      ],
    });
  });
});
