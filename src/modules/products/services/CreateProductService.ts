import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '@modules/products/typeorm/repositories/ProductRepository';
import { AppError } from '@shared/errors/AppError';
import { Product } from '../typeorm/entities/Product';

import { RedisCache } from '@shared/cache/RedisCache';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

export class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);
    const productAlreadyExists = await productRepository.findByName(name);
    if (productAlreadyExists) {
      throw new AppError('Product already exists.');
    }

    const redisCache = new RedisCache();
    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    const product = productRepository.create({
      name,
      price,
      quantity,
    });

    await productRepository.save(product);

    return product;
  }
}
