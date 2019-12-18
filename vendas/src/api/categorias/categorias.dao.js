import { instances } from 'hapi-sequelizejs'
import { getObjectOr404 } from '../utils/database.utils';

const Categoria = instances.getModel('categoria');

export default class CategoriasDAO {

  async findAll(params) {
    return Categoria.findAll({
      where: params,
      include: [ 'tags' ]
    });
  }

  async findByID(id) {
    return getObjectOr404(Categoria, {
      where: { id },
      include: [ 'tags' ]
    });
  }

  async create(data) {
    return Categoria.create(data);
  }

  async update(id, data) {
    const categoria = await this.findByID(id);

    return categoria.update(data);
  }

  async destroy(id) {
    const categoria = await this.findByID(id);

    return categoria.destroy();
  }
}
