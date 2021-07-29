import { Router } from 'express';

import { AuthenticateController } from '@modules/users/controllers/AuthenticateController';

import { AuthenticateCelebrateMiddleware } from '@modules/users/middlewares/AuthenticateCelebrateMiddleware';

const authRouter = Router();

const authenticateController = new AuthenticateController();
const authenticateCelebrateMiddleware = new AuthenticateCelebrateMiddleware();

authRouter.post(
  '/',
  authenticateCelebrateMiddleware.authenticate(),
  authenticateController.authenticate,
);

export { authRouter };
