import { instances } from 'hapi-sequelizejs'
import { getObjectOr404 } from '../utils/database.utils';

const Produto = instances.getModel('produto');

export default class ProdutosDAO {

  async findAll(params) {
    return Produto.findAll({ 
      where: params,
      include: [ 'categoria' ]
    });
  }

  async findByID(id) {
    return getObjectOr404(Produto, { 
      where: { id } ,
      include: [ 'categoria' ]
    });
  }

  async create(data) {
    return Produto.create(data);
  }

  async update(id, data) {
    const produto = await this.findByID(id);

    return produto.update(data);
  }

  async destroy(id) {
    const produto = await this.findByID(id);

    return produto.destroy();
  }
}
