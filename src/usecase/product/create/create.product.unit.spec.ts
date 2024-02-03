import CreateProductUseCase from "./create.product";

describe("Unit Test Create Product", () => {
  const MockProductRepository = () => ({
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findAll: jest.fn(),
  });

  it("should create a product use case", async () => {
    const productRepository = MockProductRepository();
    const userCase = new CreateProductUseCase(productRepository);

    // Act
    const result = await userCase.execute({
      name: "Product 1",
      price: 10,
    });

    // Assert
    expect(result).toEqual({
      id: result.id,
      name: "Product 1",
      price: 10,
    });
  });
});
