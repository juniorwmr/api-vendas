import { Request, Response } from 'express';
import { CreateOrderService } from '../services/CreateOrderService';
import { ShowOrderService } from '../services/ShowOrderService copy';

export class OrderController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showOrderService = new ShowOrderService();

    const order = await showOrderService.execute({ order_id: id });
    return response.status(200).json(order);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { customer_id, products } = request.body;

    const createOrderService = new CreateOrderService();
    const order = await createOrderService.execute({ customer_id, products });

    return response.status(201).json(order);
  }
}
