import { celebrate, Joi, Segments } from 'celebrate';

export class ResetPasswordCelebrateMiddleware {
  create() {
    return celebrate({
      [Segments.BODY]: {
        email: Joi.string().email().required(),
      },
    });
  }

  update() {
    return celebrate({
      [Segments.BODY]: {
        token: Joi.string().uuid().required(),
        password: Joi.string().required(),
        password_confirmation: Joi.string()
          .required()
          .valid(Joi.ref('password')),
      },
    });
  }
}
