import ListProductUseCase from "./list.product";

describe("Unit Test List Product", () => {
  const MockProductRepository = () => ({
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findAll: jest.fn().mockReturnValue([
      {
        id: "1",
        name: "Product 1",
        price: 10,
      },
    ]),
  });

  it("should list a product use case", async () => {
    const productRepository = MockProductRepository();
    const userCase = new ListProductUseCase(productRepository);

    // Act
    const result = await userCase.execute({
      limit: 10,
      page: 1,
    });

    // Assert
    expect(result).toEqual([
      {
        id: "1",
        name: "Product 1",
        price: 10,
      },
    ]);
  });
});
