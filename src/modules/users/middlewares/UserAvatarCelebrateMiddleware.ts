import { celebrate, Joi, Segments } from 'celebrate';

export class UserAvatarCelebrateMiddleware {
  update() {
    return celebrate({
      [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
      }).unknown(),
    });
  }
}
