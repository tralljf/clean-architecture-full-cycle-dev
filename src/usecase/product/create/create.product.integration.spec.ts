import { Sequelize } from "sequelize-typescript";
import CreateProductUseCase from "./create.product";
import ProductModel from "../../../infrasctructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrasctructure/product/repository/sequelize/product.repository";

describe("Create Product Integration Test", () => {
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
    const userCase = new CreateProductUseCase(productRepository);

    // Act
    const result = await userCase.execute({
      name: "Product 1",
      price: 10,
    });

    // Assert
    const prodcutModel = await ProductModel.findOne({
      where: { id: result.id },
    });

    expect(prodcutModel.toJSON()).toEqual({
      id: result.id,
      name: "Product 1",
      price: 10,
    });
  });
});
