import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../../src/infra/db/sequelize/model/customer.model";
import Customer from "../../../../src/domain/entity/customer";
import CustomerRepository from "../../../../src/domain/repository/customer.repository";
import Address from "../../../../src/domain/entity/address";

describe("CustomerRepository", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const customerRepository = new CustomerRepository();
    const address = new Address("Street 1", "City 1", "12345", "Country 1");
    const customer = new Customer("1", "John Doe", address);

    await customerRepository.create(customer);

    const createdCustomer = await CustomerModel.findOne({ where: { id: "1" } });
    expect(createdCustomer?.toJSON()).toStrictEqual({
      id: "1",
      name: "John Doe",
      street: "Street 1",
      city: "City 1",
      zip: "12345",
      country: "Country 1",
      active: false,
      rewards: 0,
    });
  });

  it("should update a customer", async () => {
    const customerRepository = new CustomerRepository();
    const address = new Address("Street 1", "City 1", "12345", "Country 1");
    const customer = new Customer("1", "John Doe", address);

    await customerRepository.create(customer);

    customer.changeName("Jane Doe");
    customer.activate();

    await customerRepository.update(customer);

    const updatedCustomer = await CustomerModel.findOne({ where: { id: "1" } });
    expect(updatedCustomer?.toJSON()).toStrictEqual({
      id: "1",
      name: "Jane Doe",
      street: "Street 1",
      city: "City 1",
      zip: "12345",
      country: "Country 1",
      active: true,
      rewards: 0,
    });
  });

  it("should find all customers", async () => {
    const customerRepository = new CustomerRepository();
    const address1 = new Address("Street 1", "City 1", "12345", "Country 1");
    const address2 = new Address("Street 2", "City 2", "54321", "Country 2");
    const customer1 = new Customer("1", "John Doe", address1);
    const customer2 = new Customer("2", "Jane Doe", address2);

    await customerRepository.create(customer1);
    await customerRepository.create(customer2);

    const customers = await customerRepository.findAll();
    expect(customers).toHaveLength(2);
    expect(customers[0].id).toBe("1");
    expect(customers[0].name).toBe("John Doe");
    expect(customers[0].address?.street).toBe("Street 1");
    expect(customers[0].address?.city).toBe("City 1");
    expect(customers[0].address?.zip).toBe("12345");
    expect(customers[0].address?.country).toBe("Country 1");
    expect(customers[0].isActive()).toBe(false);
    expect(customers[0].rewards).toBe(0);
    expect(customers[1].id).toBe("2");
    expect(customers[1].name).toBe("Jane Doe");
    expect(customers[1].address?.street).toBe("Street 2");
    expect(customers[1].address?.city).toBe("City 2");
    expect(customers[1].address?.zip).toBe("54321");
    expect(customers[1].address?.country).toBe("Country 2");
    expect(customers[1].isActive()).toBe(false);
    expect(customers[1].rewards).toBe(0);
  });

  it("should find a customer by id", async () => {
    const customerRepository = new CustomerRepository();
    const address = new Address("Street 1", "City 1", "12345", "Country 1");
    const customer = new Customer("1", "John Doe", address);

    await customerRepository.create(customer);

    const foundCustomer = await customerRepository.findById("1");
    expect(foundCustomer?.id).toBe("1");
  });

  it("should throw an error when customer is not found", async () => {
    const customerRepository = new CustomerRepository();

    await expect(customerRepository.findById("1")).rejects.toThrow(
      "Customer not found"
    );
  });
});
