import Product from "../../../../src/domain/entity/product";

describe("Product tests", () => {
  it("should create a new product", () => {
    const product = new Product("1", "Product 1", 100);
    expect(product).toBeDefined();
  });

  it("should validate invalid product id", () => {
    expect(() => {
      new Product("", "Product 1", 100);
    }).toThrowError("Id is required");
  });

  it("should validate invalid product name", () => {
    expect(() => {
      new Product("1", "", 100);
    }).toThrowError("Name is required");
  });

  it("should validate invalid product price", () => {
    expect(() => {
      new Product("1", "Product 1", -1);
    }).toThrowError("Price must be greater than 0");
  });

  it("should validate valid product", () => {
    const product = new Product("1", "Product 1", 0);
    expect(product).toBeDefined();
  });

  it("should change product name", () => {
    const product = new Product("1", "Product 1", 100);
    product.setName("Product 2");
    expect(product.getName()).toBe("Product 2");
  });

  it("should validate invalid product name after change", () => {
    const product = new Product("1", "Product 1", 100);
    expect(() => {
      product.setName("");
    }).toThrowError("Name is required");
  });

  it("should change product price", () => {
    const product = new Product("1", "Product 1", 100);
    product.setPrice(200);
    expect(product.getPrice()).toBe(200);
  });

  it("should validate invalid product price after change", () => {
    const product = new Product("1", "Product 1", 100);
    expect(() => {
      product.setPrice(-1);
    }).toThrowError("Price must be greater than 0");
  });
});
