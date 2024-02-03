import CreateCustomerUseCase from "./create.customer";

describe("Unit Test Create Customer", () => {
  const MockCustomerRepository = () => ({
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findAll: jest.fn(),
  });

  it("should create a customer use case", async () => {
    const customerRepository = MockCustomerRepository();
    const useCase = new CreateCustomerUseCase(customerRepository);

    const input = {
      name: "John Doe",
      address: {
        street: "rua",
        city: "cidade",
        zip: "123",
        country: "pais",
      },
    };

    const result = await useCase.execute(input);

    expect(result).toEqual({
      id: expect.any(String),
      name: "John Doe",
      address: {
        street: "rua",
        city: "cidade",
        zip: "123",
        country: "pais",
      },
    });
  });

  it("should throw erro an customer when name is missing", async () => {
    const customerRepository = MockCustomerRepository();
    const useCase = new CreateCustomerUseCase(customerRepository);

    const input = {
      name: "",
      address: {
        street: "rua",
        city: "cidade",
        zip: "123",
        country: "pais",
      },
    };

    await expect(useCase.execute(input)).rejects.toThrowError(
      "Name is required"
    );
  });

  it("should throw erro an customer when streeg is missing", async () => {
    const customerRepository = MockCustomerRepository();
    const useCase = new CreateCustomerUseCase(customerRepository);

    const input = {
      name: "John Doe",
      address: {
        street: "",
        city: "cidade",
        zip: "zip",
        country: "pais",
      },
    };

    await expect(useCase.execute(input)).rejects.toThrowError(
      "Street is required"
    );
  });
});
