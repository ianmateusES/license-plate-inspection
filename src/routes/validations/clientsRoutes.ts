import { celebrate, Joi, Segments } from 'celebrate';

const postClientValidate = celebrate({
  [Segments.BODY]: {
    cpf: Joi.string().length(11).required(),
    name: Joi.string().trim().required(),
  },
});

const getClientValidate = celebrate({
  [Segments.PARAMS]: {
    cpf: Joi.string().length(11).required(),
  },
});

const deleteClientValidate = celebrate({
  [Segments.PARAMS]: {
    cpf: Joi.string().length(11).required(),
  },
});

export { postClientValidate, getClientValidate, deleteClientValidate };
