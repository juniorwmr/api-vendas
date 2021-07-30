import { getCustomRepository } from 'typeorm';

import { ProductRepository } from '@modules/products/typeorm/repositories/ProductRepository';
import { AppError } from '@shared/errors/AppError';
import { RedisCache } from '@shared/cache/RedisCache';

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

    const redisCache = new RedisCache();
    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    await productRepository.remove(product);
  }
}
