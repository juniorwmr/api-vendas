import { getCustomRepository } from 'typeorm';
import { OrderRepository } from '@modules/orders/typeorm/repositories/OrderRepository';
import { CustomerRepository } from '@modules/customers/typeorm/repositories/CustomerRepository';
import { ProductRepository } from '@modules/products/typeorm/repositories/ProductRepository';
import { AppError } from '@shared/errors/AppError';
import { Order } from '../typeorm/entities/Order';

interface IProduct {
  id: string;
  quantity: number;
  price: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

export class CreateOrderService {
  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const orderRepository = getCustomRepository(OrderRepository);
    const customerRepository = getCustomRepository(CustomerRepository);
    const productRepository = getCustomRepository(ProductRepository);
    const customer = await customerRepository.findOne({
      id: customer_id,
    });

    if (!customer) {
      throw new AppError('Could not find any costumer with the given id.');
    }

    const existsProducts = await productRepository.findAllByIds(products);

    if (!existsProducts.length) {
      throw new AppError('Could not find any products with the given id.');
    }

    const existsProductsIds = existsProducts.map(product => product.id);

    // Verificar apenas os produtos existentes
    const checkInexistentProducts = products.filter(
      product => !existsProductsIds.includes(product.id),
    );

    if (checkInexistentProducts.length !== 0) {
      throw new AppError(
        `Could not find products ${checkInexistentProducts[0].id}.`,
      );
    }

    // Não vender mais do que está no estoque
    const quantityAvailable = products.filter(product => {
      return (
        existsProducts.filter(p => p.id === product.id)[0].quantity <
        product.quantity
      );
    });

    if (quantityAvailable.length !== 0) {
      throw new AppError(
        `There are not products id [${quantityAvailable.map(
          p => p.id,
        )}] available for ${quantityAvailable[0].id}.`,
      );
    }

    // Convertendo objetos do produto para inserir na Order
    const serializedProducts = existsProducts.map(product => ({
      product_id: product.id,
      price: product.price,
      quantity: products.filter(p => p.id === product.id)[0].quantity,
    }));

    const order = await orderRepository.createOrder({
      customer,
      products: serializedProducts,
    });

    const { order_products } = order;

    // Subtrair a quantidade de produto em estoque da quantidade em order
    const updatedProductQuantity = order_products.map(product => ({
      id: product.product_id,
      quantity:
        existsProducts.filter(p => p.id === product.product_id)[0].quantity -
        product.quantity,
    }));

    await productRepository.save(updatedProductQuantity);

    return order;
  }
}
