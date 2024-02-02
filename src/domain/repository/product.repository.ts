import ProductModel from "../../infra/db/sequelize/model/product.model";
import Product from "../entity/product";
import ProductRepositoryInterface from "./product-repository.interface";

export default class ProductRepository implements ProductRepositoryInterface {
  async create(entity: Product): Promise<void> {
    await ProductModel.create({
      id: entity.id,
      name: entity.name,
      price: entity.price,
    });
  }

  async update(entity: Product): Promise<void> {
    await ProductModel.update(
      {
        name: entity.name,
        price: entity.price,
      },
      { where: { id: entity.id } }
    );
  }

  async findById(id: string): Promise<Product> {
    const product = await ProductModel.findOne({ where: { id } });

    if (product == null) {
      throw new Error("Product not found");
    }

    return new Product(product.id, product.name, product.price);
  }

  async findAll(): Promise<Product[]> {
    const products = await ProductModel.findAll();
    return products.map(
      (product) => new Product(product.id, product.name, product.price)
    );
  }
}
