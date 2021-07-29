import { Router } from 'express';

import { ForgotPasswordController } from '@modules/users/controllers/ForgotPasswordController';

import { ResetPasswordCelebrateMiddleware } from '@modules/users/middlewares/ResetPasswordCelebrateMiddleware';

const passwordRouter = Router();

const forgotPasswordController = new ForgotPasswordController();
const resetPasswordCelebrateMiddleware = new ResetPasswordCelebrateMiddleware();

passwordRouter.post(
  '/forgot',
  resetPasswordCelebrateMiddleware.create(),
  forgotPasswordController.create,
);

export { passwordRouter };
