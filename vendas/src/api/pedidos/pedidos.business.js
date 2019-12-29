import PedidosDAO from './pedidos.dao';

const pedidosDAO = new PedidosDAO();

export default class PedidosBusiness {

  async list(where) {
    return pedidosDAO.findAll(where);
  }

  async detail({ params }) {
    const { id } = params;

    return pedidosDAO.findByID(id);
  }

  async create({ payload }) {
    return pedidosDAO.create(payload);
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
