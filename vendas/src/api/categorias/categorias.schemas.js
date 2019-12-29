import * as Joi from '@hapi/joi';

const params = Joi.object({
  id: Joi.number().integer().required()
});

const payload = Joi.object({
  descricao: Joi.string().min(3).required()
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
