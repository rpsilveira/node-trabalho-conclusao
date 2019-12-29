import ClientesDAO from './clientes.dao';

const clientesDAO = new ClientesDAO();

export default class ClientesBusiness {

  async list(where) {
    return clientesDAO.findAll(where);
  }

  async detail({ params }) {
    const { id } = params;

    return clientesDAO.findByID(id);
  }

  async create({ payload }) {
    return clientesDAO.create(payload);
  }

  async update({ params, payload }) {
    const { id } = params;

    return clientesDAO.update(id, payload);
  }

  async destroy({ params }) {
    const { id } = params;

    return clientesDAO.destroy(id);
  }
}
