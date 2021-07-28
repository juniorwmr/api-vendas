import { celebrate, Joi, Segments } from 'celebrate';

export class UserCelebrateMiddleware {
  create() {
    return celebrate({
      [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      },
    });
  }
}
