import { Model } from 'sequelize';

export default (sequelize, dataTypes) => {
  class Produto extends Model {}

  Produto.init({
    descricao: dataTypes.STRING,
    valor: dataTypes.FLOAT
  }, { sequelize, modelName: 'produto', tableName: 'produtos' });

  Produto.associate = models => {
    models.produto.belongsTo(models.categoria);
  };

  return Produto;
};
