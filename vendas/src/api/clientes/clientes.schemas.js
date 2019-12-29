import * as Joi from '@hapi/joi';

const params = Joi.object({
  id: Joi.number().integer().required()
});

const payload = Joi.object({
  nome: Joi.string().min(3).required(),
  cnpjcpf: Joi.string().required(),
  email: Joi.string().required(),
  senha: Joi.string().min(6).required()
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
