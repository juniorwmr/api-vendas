import { getCustomRepository } from 'typeorm';
import { Product } from '@modules/products/typeorm/entities/Product';
import { ProductRepository } from '@modules/products/typeorm/repositories/ProductRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

export class DeleteProductService {
  public async execute({ id }: IRequest) {
    const productRepository = getCustomRepository(ProductRepository);
    const product = await productRepository.findOne(id);
    if (!product) {
      throw new AppError('Product not found.');
    }
    await productRepository.remove(product);
  }
}
