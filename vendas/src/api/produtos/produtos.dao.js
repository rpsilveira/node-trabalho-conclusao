import { instances } from 'hapi-sequelizejs'
import { getObjectOr404 } from '../utils/database.utils';

const Produtos = instances.getModel('produtos');

export default class ProdutosDAO {

  async findAll(params) {
    return Produtos.findAll({
      where: params,
      include: [ 'tags' ]
    });
  }

  async findByID(id) {
    return getObjectOr404(Produtos, {
      where: { id },
      include: [ 'tags' ]
    });
  }

  async create(data) {
    return Produtos.create(data);
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
