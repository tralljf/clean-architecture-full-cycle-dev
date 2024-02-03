import FindCustomerUseCase from "./find.customer";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";

const addres = new Address("rua", "cidade", "123", "pais");
const customer = new Customer("1", "John Doe");
customer.setAddress(addres);

const MockCustomerRepository = () => ({
  findById: jest.fn().mockReturnValue(Promise.resolve(customer)),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findAll: jest.fn(),
});

describe("Unit Test Find Customer", () => {
  it("should find a customer", async () => {
    const customerRepository = MockCustomerRepository();
    const useCase = new FindCustomerUseCase(customerRepository);

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

  it("should not find a customer", async () => {
    const customerRepository = MockCustomerRepository();
    customerRepository.findById.mockImplementation(() => {
      throw new Error("Customer not found");
    });
    const useCase = new FindCustomerUseCase(customerRepository);

    const input = {
      id: "1",
    };

    expect(useCase.execute(input)).rejects.toThrowError("Customer not found");
  });
});
