import { Router } from 'express';

import { OrderController } from '../controllers/OrderController';
import { OrderCelebrateMiddleware } from '../middlewares/OrderCelebrateMiddleware';

const ordersRoutes = Router();

const orderController = new OrderController();
const orderCelebrateMiddleware = new OrderCelebrateMiddleware();

ordersRoutes
  .get('/:id', orderCelebrateMiddleware.show(), orderController.show)
  .post('/', orderCelebrateMiddleware.create(), orderController.create);

export { ordersRoutes };
