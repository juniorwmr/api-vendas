import { celebrate, Joi, Segments } from 'celebrate';

export class OrderCelebrateMiddleware {
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
        customer_id: Joi.string().required(),
        products: Joi.array()
          .items(
            Joi.object({
              id: Joi.string().required(),
              quantity: Joi.number().required(),
              price: Joi.number().required(),
            }),
          )
          .required(),
      },
    });
  }
}
