import { ProductController } from '@modules/products/controllers/ProductController';
import { Router } from 'express';

const productsRouter = Router();

const productController = new ProductController();
productsRouter.get('/', productController.index);
productsRouter.get('/:id', productController.show);
productsRouter.post('/', productController.create);
productsRouter.put('/', productController.update);
productsRouter.delete('/:id', productController.delete);

export { productsRouter };
