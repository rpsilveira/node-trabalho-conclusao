import { Model } from 'sequelize';

export default (sequelize, dataTypes) => {
  class Produtos extends Model {}

  Produtos.init({
    descricao: dataTypes.STRING,
    valor: dataTypes.FLOAT
  }, { sequelize, modelName: 'produto', tableName: 'produtos' });

  return Produtos;
};
