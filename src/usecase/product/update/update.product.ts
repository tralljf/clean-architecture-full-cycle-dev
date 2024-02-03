import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import {
  InputUpdateProductDto,
  OutputUpdateProductDto,
} from "./update.product.dto";

export default class UpdateProductUseCase {
  constructor(private productRepository: ProductRepositoryInterface) {}
  async execute(input: InputUpdateProductDto): Promise<OutputUpdateProductDto> {
    const product = await this.productRepository.findById(input.id);

    product.setName(input.name);
    product.setPrice(input.price);

    await this.productRepository.update(product);
    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
