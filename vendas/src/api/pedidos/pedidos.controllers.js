import Boom from '@hapi/boom';
import { CREATED, NO_CONTENT } from 'http-status';

import PedidosBusiness from './pedidos.business';

const pedidosBusiness = new PedidosBusiness();

export default class PedidosController {

  async list(request, h) {
    return await pedidosBusiness.list(request.query);
  }

  async detail(request, h) {
    return await pedidosBusiness.detail(request);
  }

  async create(request, h) {
    try {
      const pedido = await pedidosBusiness.create(request);

      return h.response(pedido).code(CREATED);
    } catch(err) {
      if (err.name == 'SequelizeForeignKeyConstraintError')
        throw Boom.badRequest('Houve violação de chave estrangeira. Verifique os dados e tente novamente');
      else
        throw Boom.badRequest(err);
    }
  }

  async update(request, h) {
    try {
      return await pedidosBusiness.update(request);
    } catch(err) {
      if (err.name == 'SequelizeForeignKeyConstraintError')
        throw Boom.badRequest('Houve violação de chave estrangeira. Verifique os dados e tente novamente');
      else
        throw Boom.badRequest(err);
    }    
  }

  async destroy(request, h) {
    await pedidosBusiness.destroy(request);

    return h.response().code(NO_CONTENT);
  }
}
