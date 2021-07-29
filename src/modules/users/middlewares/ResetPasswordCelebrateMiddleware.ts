import { celebrate, Joi, Segments } from 'celebrate';

export class ResetPasswordCelebrateMiddleware {
  create() {
    return celebrate({
      [Segments.BODY]: {
        email: Joi.string().email().required(),
      },
    });
  }
}
