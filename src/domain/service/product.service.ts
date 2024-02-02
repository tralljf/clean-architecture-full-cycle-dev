import Product from "../entity/product";

export default class ProductService {
  incrementPrice(products: Product[], percentage: number): void {
    products.forEach((product) => {
      product.setPrice(product.getPrice() * (1 + percentage / 100));
    });
  }
}
