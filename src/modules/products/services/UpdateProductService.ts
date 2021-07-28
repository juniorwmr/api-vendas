import { getCustomRepository } from 'typeorm';
import { Product } from '../typeorm/entities/Product';
import { ProductRepository } from '@modules/products/typeorm/repositories/ProductRepository';
import { AppError } from '@shared/errors/AppError';

interface IProductRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export class UpdateProductService {
  public async execute(requestData: IProductRequest): Promise<Product> {
    const { id, name } = requestData;
    const productRepository = getCustomRepository(ProductRepository);
    const product = await productRepository.findOne(id);
    if (!product) {
      throw new AppError('Product not found.');
    }

    const productNameAlreadyExists = await productRepository.findByName(name);
    if (
      productNameAlreadyExists &&
      productNameAlreadyExists.id !== product.id
    ) {
      throw new AppError('There is already one product with this name.');
    }

    Object.keys(product).forEach((key: string) => {
      (product as any)[key] = (requestData as any)[key];
    });

    await productRepository.save(product);

    return product;
  }
}
