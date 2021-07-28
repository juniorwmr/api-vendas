import { Router } from 'express';

import { ProductController } from '@modules/products/controllers/ProductController';
import { CelebrateMiddleware } from '@modules/products/middlewares/CelebrateMiddleware';

const productsRouter = Router();

const productController = new ProductController();
const celebrateMiddleware = new CelebrateMiddleware();

productsRouter
  .get('/', productController.index)
  .get('/:id', celebrateMiddleware.show(), productController.show)
  .post('/', celebrateMiddleware.create(), productController.create)
  .put('/:id', celebrateMiddleware.update(), productController.update)
  .delete('/:id', celebrateMiddleware.delete(), productController.delete);

export { productsRouter };
