import Product from "../../../../src/domain/entity/product";
import ProductService from "../../../../src/domain/service/product.service";

describe("Product Service unit test", () => {
  it("should increment product price by 10%", () => {
    const productService = new ProductService();
    const product1 = new Product("1", "Product 1", 10);
    const product2 = new Product("2", "Product 2", 2);
    productService.incrementPrice([product1, product2], 10);

    expect(product1.price).toBe(11);
    expect(product2.price).toBe(2.2);
  });
});
