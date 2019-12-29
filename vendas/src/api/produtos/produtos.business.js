import ProdutosDAO from './produtos.dao';

const produtosDAO = new ProdutosDAO();

export default class ProdutosBusiness {

  async list(where) {
    return produtosDAO.findAll(where);
  }

  async detail({ params }) {
    const { id } = params;

    return produtosDAO.findByID(id);
  }

  async create({ payload }) {
    return produtosDAO.create(payload);
  }

  async update({ params, payload }) {
    const { id } = params;

    return produtosDAO.update(id, payload);
  }

  async destroy({ params }) {
    const { id } = params;

    return produtosDAO.destroy(id);
  }
}
