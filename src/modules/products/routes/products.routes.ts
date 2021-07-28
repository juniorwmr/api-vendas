import { Router } from 'express';

import { ProductController } from '@modules/products/controllers/ProductController';
import { ProductCelebrateMiddleware } from '@modules/products/middlewares/ProductCelebrateMiddleware';

const productsRouter = Router();

const productController = new ProductController();
const productCelebrateMiddleware = new ProductCelebrateMiddleware();

productsRouter
  .get('/', productController.index)
  .get('/:id', productCelebrateMiddleware.show(), productController.show)
  .post('/', productCelebrateMiddleware.create(), productController.create)
  .put('/:id', productCelebrateMiddleware.update(), productController.update)
  .delete(
    '/:id',
    productCelebrateMiddleware.delete(),
    productController.delete,
  );

export { productsRouter };
