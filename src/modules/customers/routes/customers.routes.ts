import { Router } from 'express';

import { CustomerController } from '@modules/customers/controllers/CustomerController';
import { CustomerCelebrateMiddleware } from '@modules/customers/middlewares/CustomerCelebrateMiddleware';

const customersRouter = Router();

const customerController = new CustomerController();
const customerCelebrateMiddleware = new CustomerCelebrateMiddleware();

customersRouter
  .get('/', customerController.index)
  .get('/:id', customerCelebrateMiddleware.show(), customerController.show)
  .post('/', customerCelebrateMiddleware.create(), customerController.create)
  .put('/:id', customerCelebrateMiddleware.update(), customerController.update)
  .delete(
    '/:id',
    customerCelebrateMiddleware.delete(),
    customerController.delete,
  );

export { customersRouter };
