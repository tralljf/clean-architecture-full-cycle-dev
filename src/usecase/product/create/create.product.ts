import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import {
  InputCreateProductDto,
  OutputCreateProductDto,
} from "./create.product.dto";
import { v4 as uuidv4 } from "uuid";

export default class CreateProductUseCase {
  private productRepository: ProductRepositoryInterface;
  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto> {
    const product = new Product(uuidv4(), input.name, input.price);
    await this.productRepository.create(product);
    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
