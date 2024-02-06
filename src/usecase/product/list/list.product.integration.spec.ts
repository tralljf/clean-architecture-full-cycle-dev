import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrasctructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrasctructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product";

describe("Test List Integration Product", () => {
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

  it("should list products", async () => {
    // Arrange
    ProductModel.create({
      id: "1",
      name: "Product 1",
      price: 10,
    });

    ProductModel.create({
      id: "2",
      name: "Product 2",
      price: 20,
    });

    // Act
    const productRepository = new ProductRepository();
    const useCase = new ListProductUseCase(productRepository);

    const result = await useCase.execute({
      page: 1,
      limit: 10,
    });

    // Assert
    expect(result).toEqual([
      {
        id: "1",
        name: "Product 1",
        price: 10,
      },
      {
        id: "2",
        name: "Product 2",
        price: 20,
      },
    ]);
  });
});
