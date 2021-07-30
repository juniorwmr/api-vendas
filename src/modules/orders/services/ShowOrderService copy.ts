import { getCustomRepository } from 'typeorm';
import { OrderRepository } from '@modules/orders/typeorm/repositories/OrderRepository';
import { AppError } from '@shared/errors/AppError';
import { Order } from '../typeorm/entities/Order';

interface IRequest {
  order_id: string;
}

export class ShowOrderService {
  public async execute({ order_id }: IRequest): Promise<Order> {
    const orderRepository = getCustomRepository(OrderRepository);
    const order = await orderRepository.findById(order_id);

    if (!order) {
      throw new AppError('Cloud not find any order with the given id.');
    }

    return order;
  }
}
