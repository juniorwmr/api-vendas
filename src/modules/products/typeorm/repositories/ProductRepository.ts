import { EntityRepository, In, Repository } from 'typeorm';
import { Product } from '../entities/Product';

interface IProduct {
  id: string;
}

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  public async findByName(name: string): Promise<Product | undefined> {
    return this.findOne({ name });
  }

  public async findAllByIds(products: IProduct[]): Promise<Product[]> {
    const productsId = products.map(product => product.id);

    const existsProducts = await this.find({
      where: {
        id: In(productsId),
      },
    });
    return existsProducts;
  }
}
