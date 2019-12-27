import { instances } from 'hapi-sequelizejs'
import { getObjectOr404 } from '../utils/database.utils';

const Pedido = instances.getModel('pedido');

export default class PedidosDAO {

  async findAll(params) {
    return Pedido.findAll({ 
      where: params,
      include: [ 'itens' ]
    });
  }

  async findByID(id) {
    return getObjectOr404(Pedido, { 
      where: { id },
      include: [ 'itens' ]
    });
  }

  async create(data) {
    return Pedido.create(data, {
      include: [ 'itens' ]
    });
  }

  async update(id, data) {
    const pedido = await this.findByID(id);

    return pedido.update(data);
  }

  async destroy(id) {
    const pedido = await this.findByID(id);

    return pedido.destroy();
  }
}
