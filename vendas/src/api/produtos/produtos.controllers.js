import Boom from '@hapi/boom';
import { CREATED, NO_CONTENT } from 'http-status';

import ProdutosBusiness from './produtos.business';

const produtosBusiness = new ProdutosBusiness();

export default class ProdutosController {

  async list(request, h) {
    return await produtosBusiness.list(request.query);
  }

  async detail(request, h) {
    return await produtosBusiness.detail(request);
  }

  async create(request, h) {
    try {
      const produto = await produtosBusiness.create(request);

      return h.response(produto).code(CREATED);
    } catch(err) {
      console.log(err);
      if (err.name == 'SequelizeForeignKeyConstraintError')
        throw Boom.badRequest('Houve violação de chave estrangeira. Verifique os dados e tente novamente');
      else
        throw Boom.internal('Ocorreu um erro ao incluir o produto. Por favor, tente novamente');
    }
  }

  async update(request, h) {
    try {
      return await produtosBusiness.update(request);
    } catch(err) {
      console.log(err);
      if (err.name == 'SequelizeForeignKeyConstraintError')
        throw Boom.badRequest('Houve violação de chave estrangeira. Verifique os dados e tente novamente');
      else
        throw Boom.internal('Ocorreu um erro ao alterar o produto. Por favor, tente novamente');
    }
  }

  async destroy(request, h) {
    await produtosBusiness.destroy(request);

    return h.response().code(NO_CONTENT);
  }
}
