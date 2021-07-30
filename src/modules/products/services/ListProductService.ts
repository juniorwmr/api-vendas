import { getCustomRepository } from 'typeorm';

import { Product } from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductRepository';

import { RedisCache } from '@shared/cache/RedisCache';

export class ListProductService {
  public async execute(): Promise<Product[]> {
    const productRepository = getCustomRepository(ProductRepository);

    const redisCache = new RedisCache();

    let products = await redisCache.recover<Product[]>(
      'api-vendas-PRODUCT_LIST',
    );
    if (!products) {
      products = await productRepository.find();
      await redisCache.save('api-vendas-PRODUCT_LIST', products);
    }

    return products;
  }
}
