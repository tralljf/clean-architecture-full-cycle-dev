import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrasctructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrasctructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product";
import CreateProductUseCase from "../create/create.product";

describe("Test Integration Update Product", () => {
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

  it("should update a product", async () => {
    // Arrange
    const productRepository = new ProductRepository();
    const useCaseCreate = new CreateProductUseCase(productRepository);

    const product = await useCaseCreate.execute({
      name: "Product 1",
      price: 10,
    });

    // Act
    product.name = "Product 2";
    const useCase = new UpdateProductUseCase(productRepository);
    const result = await useCase.execute(product);

    // Assert
    const prodcutModel = await ProductModel.findOne({
      where: { id: result.id },
    });

    expect(prodcutModel.toJSON()).toEqual({
      id: result.id,
      name: "Product 2",
      price: 10,
    });
  });
});
