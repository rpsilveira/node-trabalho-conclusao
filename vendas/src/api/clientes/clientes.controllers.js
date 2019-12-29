import Boom from '@hapi/boom';
import { CREATED, NO_CONTENT } from 'http-status';
import { authenticate, getToken } from '../utils/auth.utils';
import ClientesBusiness from './clientes.business';

const clientesBusiness = new ClientesBusiness();

export default class ClientesController {

  async list(request, h) {
    return await clientesBusiness.list(request);
  }

  async detail(request, h) {
    return await clientesBusiness.detail(request);
  }

  async login({ payload }, h) {
    const cliente = await authenticate(payload);
    const token = getToken({
      id: cliente.id,
      email: cliente.email
    });

    return { cliente, token };
  }

  async create(request, h) {
    try {
      const cliente = await clientesBusiness.create(request);
      
      return h.response(cliente).code(CREATED);          
    } catch(err) {
      throw Boom.badRequest(err.errors[0].message);
    }
  }

  async update(request, h) {
    return await clientesBusiness.update(request);
  }

  async destroy(request, h) {
    await clientesBusiness.destroy(request);

    return h.response().code(NO_CONTENT);
  }
}
