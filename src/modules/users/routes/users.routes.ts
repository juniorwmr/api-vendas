import { Router } from 'express';

import { UserController } from '@modules/users/controllers/UserController';

import { UserCelebrateMiddleware } from '@modules/users/middlewares/UserCelebrateMiddleware';
import { isAuthenticated } from '@shared/http/middlewares/isAuthenticated';

const usersRouter = Router();

const userController = new UserController();
const userCelebrateMiddleware = new UserCelebrateMiddleware();

usersRouter
  .get('/', isAuthenticated, userController.index)
  .post('/', userCelebrateMiddleware.create(), userController.create);

export { usersRouter };
