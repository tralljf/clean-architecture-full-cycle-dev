import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.customer";

const addres = new Address("rua", "cidade", "123", "pais");
const customer = new Customer("1", "John Doe");
customer.setAddress(addres);

const input = {
  id: "1",
  name: "John update",
  address: {
    street: "rua update",
    city: "cidade update",
    zip: "123 update",
    country: "pais update",
  },
};

const MockCustomerRepository = () => ({
  findById: jest.fn().mockReturnValue(Promise.resolve(customer)),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findAll: jest.fn(),
});

describe("Unit Test Update Customer", () => {
  it("should update a customer use case", async () => {
    const customerRepository = MockCustomerRepository();
    const useCase = new UpdateCustomerUseCase(customerRepository);

    const result = await useCase.execute(input);

    expect(result).toEqual({
      id: "1",
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
