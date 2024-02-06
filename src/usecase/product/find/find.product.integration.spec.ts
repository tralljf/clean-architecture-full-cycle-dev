import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrasctructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrasctructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "../create/create.product";
import FindProductUseCase from "./find.product";

describe("Find Product Integration Test", () => {
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

  it("should find a product", async () => {
    // Arrange
    ProductModel.create({
      id: "1",
      name: "Product 1",
      price: 10,
    });

    const productRepository = new ProductRepository();
    const userCase = new FindProductUseCase(productRepository);

    // Act
    const result = await userCase.execute({ id: "1" });

    // Assert
    expect(result).toEqual({
      id: "1",
      name: "Product 1",
      price: 10,
    });
  });
});
