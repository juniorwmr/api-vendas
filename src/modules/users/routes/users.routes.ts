import { Router } from 'express';
import multer from 'multer';

import { UserController } from '@modules/users/controllers/UserController';

import { UserCelebrateMiddleware } from '@modules/users/middlewares/UserCelebrateMiddleware';
import { UserAvatarCelebrateMiddleware } from '@modules/users/middlewares/UserAvatarCelebrateMiddleware';
import { isAuthenticated } from '@shared/http/middlewares/isAuthenticated';

import multerConfig from '@config/upload';
import { UserAvatarController } from '../controllers/UserAvatarController';

const usersRouter = Router();

const userController = new UserController();
const userAvatarController = new UserAvatarController();
const userCelebrateMiddleware = new UserCelebrateMiddleware();
const userAvatarCelebrateMiddleware = new UserAvatarCelebrateMiddleware();

usersRouter
  .get('/', isAuthenticated, userController.index)
  .post('/', userCelebrateMiddleware.create(), userController.create)
  .patch(
    '/avatar',
    [
      isAuthenticated,
      multer(multerConfig).single('avatar'),
      userAvatarCelebrateMiddleware.update(),
    ],
    userAvatarController.update,
  );

export { usersRouter };
