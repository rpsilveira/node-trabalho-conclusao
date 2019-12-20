import PedidosDAO from './pedidos.dao';

const pedidosDAO = new PedidosDAO();

export default class PedidosBusiness {

  async list({ params }) {
    return pedidosDAO.findAll(params);
  }

  async detail({ params }) {
    const { id } = params;

    return pedidosDAO.findByID(id);
  }

  async create({ payload, auth }) {
    const { id: clienteId } = auth.credentials;

    return pedidosDAO.create({ ...payload, clienteId });
  }

  async update({ params, payload }) {
    const { id } = params;

    return pedidosDAO.update(id, payload);
  }

  async destroy({ params }) {
    const { id } = params;

    return pedidosDAO.destroy(id);
  }
}
