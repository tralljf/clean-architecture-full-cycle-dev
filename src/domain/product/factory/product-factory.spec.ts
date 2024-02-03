import Product from "../entity/product";
import ProductB from "../entity/product-b";
import ProductFactory from "./product-factory";

describe("Product Factory unit Test", () => {
  it("should create a product type A", () => {
    const product = ProductFactory.create("a", "Product A", 100);
    expect(product).toBeInstanceOf(Product);

    expect(product.id).toBeDefined();
    expect(product.name).toBe("Product A");
    expect(product.price).toBe(100);
  });

  it("should create a product type B", () => {
    const product = ProductFactory.create("b", "Product B", 100);
    expect(product).toBeInstanceOf(ProductB);

    expect(product.id).toBeDefined();
    expect(product.name).toBe("Product B");
    expect(product.price).toBe(200); // price * 2
  });

  it("should throw an error when the type is invalid", () => {
    expect(() => ProductFactory.create("c", "Product C", 100)).toThrowError(
      "Invalid product type"
    );
  });
});
