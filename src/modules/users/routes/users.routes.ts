import { Router } from 'express';

import { UserController } from '@modules/users/controllers/UserController';
import { AuthenticateController } from '@modules/users/controllers/AuthenticateController';

import { UserCelebrateMiddleware } from '@modules/users/middlewares/UserCelebrateMiddleware';
import { isAuthenticated } from '../middlewares/isAuthenticated';

const usersRouter = Router();

const userController = new UserController();
const userCelebrateMiddleware = new UserCelebrateMiddleware();

usersRouter
  .get('/', userController.index)
  .post('/', userCelebrateMiddleware.create(), userController.create);

export { usersRouter };
