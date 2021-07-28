import { Router } from 'express';

import { AuthenticateController } from '@modules/users/controllers/AuthenticateController';

import { AuthenticateCelebrateMiddleware } from '@modules/users/middlewares/AuthenticateCelebrateMiddleware';

const AuthRouter = Router();

const authenticateController = new AuthenticateController();
const authenticateCelebrateMiddleware = new AuthenticateCelebrateMiddleware();

AuthRouter.post(
  '/',
  authenticateCelebrateMiddleware.authenticate(),
  authenticateController.authenticate,
);

export { AuthRouter };
