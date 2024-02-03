import Product from "../../../domain/product/entity/product";
import UpdateProductUseCase from "./update.product";

describe("Unit Test Update Product", () => {
  const product = new Product("1", "Product 1", 10);

  const MockProductRepository = () => ({
    findById: jest.fn().mockReturnValue(product),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findAll: jest.fn(),
  });

  it("should update a product use case", async () => {
    const productRepository = MockProductRepository();
    const userCase = new UpdateProductUseCase(productRepository);

    // Act
    const result = await userCase.execute({
      id: "1",
      name: "Product 2",
      price: 20,
    });

    // Assert
    expect(result).toEqual({
      id: result.id,
      name: "Product 2",
      price: 20,
    });
  });
});
