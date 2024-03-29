import * as Joi from '@hapi/joi';

const params = Joi.object({
  id: Joi.number().integer().required()
});

const payload = Joi.object({
  descricao: Joi.string().min(3).required(),
  quantidade: Joi.number().required(),
  valor: Joi.number().required(),
  categoriaId: Joi.number().integer().required()
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
