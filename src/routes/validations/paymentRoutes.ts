import { celebrate, Joi, Segments } from 'celebrate';

const postPaymentValidate = celebrate({
  [Segments.BODY]: {
    cpf: Joi.string().length(11).required(),
    name: Joi.string().trim().allow(''),
    order_id: Joi.string().trim().required(),
    value: Joi.number().required(),
  },
});

const getPaymentValidate = celebrate({
  [Segments.PARAMS]: {
    payment_id: Joi.string().required(),
  },
});

const deletePaymentValidate = celebrate({
  [Segments.PARAMS]: {
    payment_id: Joi.string().required(),
  },
});

export { postPaymentValidate, getPaymentValidate, deletePaymentValidate };
