import { instances } from 'hapi-sequelizejs';
import { getObjectOr404 } from '../utils/database.utils';

const Cliente = instances.getModel('cliente');

export default class ClientesDAO {

  async findAll(where) {
    return Cliente.findAll({
      where,
      limit: 100,
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
    const cliente = await Cliente.create(data);
    
    return await this.findByID(cliente.id);
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
