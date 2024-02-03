import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrasctructure/customer/repository/sequelize/customer.model";
import FindCustomerUseCase from "./find.customer";
import Customer from "../../../domain/customer/entity/customer";
import CustomerRepository from "../../../infrasctructure/customer/repository/sequelize/customer.repository";
import Address from "../../../domain/customer/value-object/address";

describe("Test Find Customer", () => {
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

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const useCase = new FindCustomerUseCase(customerRepository);

    const addres = new Address("rua", "cidade", "123", "pais");
    const customer = new Customer("1", "John Doe");
    customer.setAddress(addres);
    await customerRepository.create(customer);

    const input = {
      id: customer.id,
    };

    const output = {
      id: "1",
      name: "John Doe",
      address: {
        street: "rua",
        city: "cidade",
        zip: "123",
        country: "pais",
      },
    };

    const result = await useCase.execute(input);

    expect(result).toEqual(output);
  });
});
