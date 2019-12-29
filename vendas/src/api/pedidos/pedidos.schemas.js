import * as Joi from '@hapi/joi';

const params = Joi.object({
  id: Joi.number().integer().required()
});

const itens = Joi.array().items(
  Joi.object({
    quantidade: Joi.number().required(),
    valor: Joi.number().required(),
    produtoId: Joi.number().integer().required()
  })
).required();

const payload = Joi.object({
  clienteId: Joi.number().integer().required(),
  itens
});

export const detail = {
  params
};

export const create = {
  payload
};

export const update = {
  params,
  payload
};
