import express, { Router } from 'express';

import { productsRouter } from '@modules/products/routes/products.routes';
import { usersRouter } from '@modules/users/routes/users.routes';
import { authRouter } from '@modules/users/routes/auth.routes';
import { passwordRouter } from '@modules/users/routes/password.routes';
import { profileRouter } from '@modules/users/routes/profile.routes';

import multerConfig from '@config/upload';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/auth', authRouter);
routes.use('/password', passwordRouter);
routes.use('/users', usersRouter);
routes.use('/profile', profileRouter);
routes.use('/files', express.static(multerConfig.dest));

export { routes };
