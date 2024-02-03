import Product from "../entity/product";
import { v4 as uuidv4 } from "uuid";
import ProductB from "../entity/product-b";
import ProductInterface from "../entity/product.interface";

export default class ProductFactory {
  static create(type: string, name: string, price: number): ProductInterface {
    if (type === "a") {
      return new Product(uuidv4(), name, price);
    }

    if (type === "b") {
      return new ProductB(uuidv4(), name, price * 2);
    }

    throw new Error("Invalid product type");
  }
}
