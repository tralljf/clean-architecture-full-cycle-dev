import ListCustomerUseCase from "./list.customer";

describe("Unit Test List Customer", () => {
  const MockCustomerRepository = () => ({
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findAll: jest.fn().mockReturnValue([
      {
        id: "1",
        name: "John",
        address: {
          street: "rua",
          city: "cidade",
          zip: "123",
          country: "pais",
        },
      },
    ]),
  });

  it("should list a customer use case", async () => {
    const customerRepository = MockCustomerRepository();
    const userCase = new ListCustomerUseCase(customerRepository);

    // Act
    const result = await userCase.execute({
      limit: 10,
      page: 1,
    });

    // Assert
    expect(result).toEqual({
      customers: [
        {
          id: "1",
          name: "John",
          address: {
            street: "rua",
            city: "cidade",
            zip: "123",
            country: "pais",
          },
        },
      ],
    });
  });
});
