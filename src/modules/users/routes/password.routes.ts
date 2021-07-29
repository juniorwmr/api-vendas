import { Router } from 'express';

import { ForgotPasswordController } from '@modules/users/controllers/ForgotPasswordController';
import { ResetPasswordController } from '@modules/users/controllers/ResetPasswordController';

import { ResetPasswordCelebrateMiddleware } from '@modules/users/middlewares/ResetPasswordCelebrateMiddleware';

const passwordRouter = Router();

const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();
const resetPasswordCelebrateMiddleware = new ResetPasswordCelebrateMiddleware();

passwordRouter.post(
  '/forgot',
  resetPasswordCelebrateMiddleware.create(),
  forgotPasswordController.create,
);
passwordRouter.post(
  '/reset',
  resetPasswordCelebrateMiddleware.update(),
  resetPasswordController.update,
);

export { passwordRouter };
