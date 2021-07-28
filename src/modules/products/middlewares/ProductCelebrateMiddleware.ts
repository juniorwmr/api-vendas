import { celebrate, Joi, Segments } from 'celebrate';

export class ProductCelebrateMiddleware {
  show() {
    return celebrate({
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
      },
    });
  }

  create() {
    return celebrate({
      [Segments.BODY]: {
        name: Joi.string().required(),
        price: Joi.number().required(),
        quantity: Joi.number().required(),
      },
    });
  }

  update() {
    return celebrate({
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
      },
      [Segments.BODY]: {
        name: Joi.string().required(),
        price: Joi.number(),
        quantity: Joi.number(),
      },
    });
  }

  delete() {
    return celebrate({
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
      },
    });
  }
}
