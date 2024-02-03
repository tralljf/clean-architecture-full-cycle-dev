import { Sequelize } from "sequelize-typescript";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.customer";
import CustomerModel from "../../../infrasctructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrasctructure/customer/repository/sequelize/customer.repository";
import CreateCustomerUseCase from "../create/create.customer";

describe("Unit Test Update Customer", () => {
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

  it("should update a customer use case", async () => {
    const customerRepository = new CustomerRepository();

    const input = {
      name: "John",
      address: {
        street: "rua",
        city: "cidade",
        zip: "123",
        country: "pais",
      },
    };

    const customer = new CreateCustomerUseCase(customerRepository);
    const customerCreated = await customer.execute(input);

    input.name = "John update";
    input.address.street = "rua update";
    input.address.city = "cidade update";
    input.address.zip = "123 update";
    input.address.country = "pais update";

    const useCase = new UpdateCustomerUseCase(customerRepository);
    const result = await useCase.execute({ ...input, id: customerCreated.id });

    expect(result).toEqual({
      id: customerCreated.id,
      name: "John update",
      address: {
        street: "rua update",
        city: "cidade update",
        zip: "123 update",
        country: "pais update",
      },
    });
  });
});
