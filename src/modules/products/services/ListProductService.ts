import { getCustomRepository } from 'typeorm';
import { Product } from '@modules/products/typeorm/entities/Product';
import { ProductRepository } from '@modules/products/typeorm/repositories/ProductRepository';
import { AppError } from '@shared/errors/AppError';

export class ListProductService {
  public async execute(): Promise<Product[]> {
    const productRepository = getCustomRepository(ProductRepository);
    const products = await productRepository.find();
    if (products.length === 0) {
      throw new AppError("There's not product registered.");
    }
    return products;
  }
}
