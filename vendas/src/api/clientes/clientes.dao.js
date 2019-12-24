import { instances } from 'hapi-sequelizejs';
import { getObjectOr404 } from '../utils/database.utils';

const Cliente = instances.getModel('cliente');

export default class ClientesDAO {

  async findAll(params) {
    return Cliente.findAll({
      where: params,
      attributes: { exclude: [ 'senha' ] }
    });
  }

  async findByID(id) {
    return getObjectOr404(Cliente, {
      where: { id },
      attributes: { exclude: [ 'senha' ] }
    });
  }

  async create(data) {
    return Cliente.create(data);
  }

  async update(id, data) {
    const cliente = await this.findByID(id)

    return await cliente.update(data);
  }

  async destroy(id) {
    const cliente = await this.findByID(id);

    return cliente.destroy();
  }
}
