import { Router } from 'express';

import { productsRouter } from '@modules/products/routes/products.routes';
import { usersRouter } from '@modules/users/routes/users.routes';
import { AuthRouter } from '@modules/users/routes/auth.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/products', productsRouter);
routes.use('/auth', AuthRouter);

export { routes };
