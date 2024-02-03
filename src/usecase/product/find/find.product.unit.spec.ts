import FindProductUseCase from "./find.product";

describe("Unit Test Find Product", () => {
  const MockProductRepository = () => ({
    findById: jest.fn().mockReturnValue({
      id: "1",
      name: "Product 1",
      price: 10,
    }),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findAll: jest.fn(),
  });
  it("should find a product use case", async () => {
    const productRepository = MockProductRepository();
    const userCase = new FindProductUseCase(productRepository);

    // Act
    const result = await userCase.execute({
      id: "1",
    });

    // Assert
    expect(result).toEqual({
      id: result.id,
      name: "Product 1",
      price: 10,
    });
  });
});
