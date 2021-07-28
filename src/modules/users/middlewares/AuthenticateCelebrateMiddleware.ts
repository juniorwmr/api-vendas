import { celebrate, Joi, Segments } from 'celebrate';

export class AuthenticateCelebrateMiddleware {
  authenticate() {
    return celebrate({
      [Segments.BODY]: {
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      },
    });
  }
}
