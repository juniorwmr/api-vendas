import express, { Router } from 'express';

import { productsRouter } from '@modules/products/routes/products.routes';
import { usersRouter } from '@modules/users/routes/users.routes';
import { AuthRouter } from '@modules/users/routes/auth.routes';

import multerConfig from '@config/upload';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/auth', AuthRouter);
routes.use('/users', usersRouter);
routes.use('/files', express.static(multerConfig.dest));

export { routes };
