import { Router } from 'express';

import { productsRouter } from './products.routes';

const routes = Router();

routes.use('/products', productsRouter);

routes.get('/', (request, response) => {
  return response.json({ message: 'Hello Dev!' });
});

export { routes };
