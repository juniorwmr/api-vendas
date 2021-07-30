import { Router } from 'express';
import multer from 'multer';

import { ProfileController } from '@modules/users/controllers/ProfileController';

import { ProfileCelebrateMiddleware } from '@modules/users/middlewares/ProfileCelebrateMiddleware';
import { isAuthenticated } from '@shared/http/middlewares/isAuthenticated';

const profileRouter = Router();

const profileController = new ProfileController();
const profileCelebrateMiddleware = new ProfileCelebrateMiddleware();

profileRouter
  .get('/', profileController.show)
  .put('/', profileCelebrateMiddleware.update(), profileController.update);

export { profileRouter };
