import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../../src/infra/db/sequelize/model/product.model";
import Product from "../../../../src/domain/entity/product";
import ProductRepository from "../../../../src/domain/repository/product.repository";

describe("ProductRepository", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 10);
    await productRepository.create(product);

    const products = await ProductModel.findOne({ where: { id: 1 } });

    expect(products).not.toBeNull();
    expect(products?.toJSON()).toStrictEqual({
      id: "1",
      name: "Product 1",
      price: 10,
    });
  });

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 10);
    await productRepository.create(product);

    product.setName("Product 2");
    product.setPrice(20);
    await productRepository.update(product);

    const products = await ProductModel.findOne({ where: { id: 1 } });

    expect(products).not.toBeNull();
    expect(products?.toJSON()).toStrictEqual({
      id: "1",
      name: "Product 2",
      price: 20,
    });
  });

  it("should find a product by id", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 10);
    await productRepository.create(product);

    const productFound = await ProductModel.findOne({ where: { id: 1 } });

    expect(productFound).not.toBeNull();
    expect(productFound?.toJSON()).toStrictEqual({
      id: "1",
      name: "Product 1",
      price: 10,
    });
  });

  it("should find all products", async () => {
    const productRepository = new ProductRepository();
    const product1 = new Product("1", "Product 1", 10);
    const product2 = new Product("2", "Product 2", 20);
    await productRepository.create(product1);
    await productRepository.create(product2);

    const productsFound = await productRepository.findAll();
    const products = [product1, product2];

    expect(productsFound).toStrictEqual(products);
  });

  it("should throw an error when product not found", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 10);
    await productRepository.create(product);

    await expect(productRepository.findById("2")).rejects.toThrow(
      "Product not found"
    );
  });
});
