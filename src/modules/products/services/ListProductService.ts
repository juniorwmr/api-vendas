import { getCustomRepository } from 'typeorm';

import { Product } from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductRepository';

interface IPaginationProduct {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
  last_page: number;
  data: Product[];
}

export class ListProductService {
  public async execute(): Promise<IPaginationProduct> {
    const productRepository = getCustomRepository(ProductRepository);
    const products = await productRepository.createQueryBuilder().paginate();

    return products as IPaginationProduct;
  }
}
