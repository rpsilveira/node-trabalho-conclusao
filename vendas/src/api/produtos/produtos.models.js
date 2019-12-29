import { Model } from 'sequelize';

export default (sequelize, dataTypes) => {
  class Produto extends Model {}

  Produto.init({
    descricao: dataTypes.STRING,
    quantidade: dataTypes.REAL,
    valor: dataTypes.REAL
  }, { sequelize, modelName: 'produto', tableName: 'tb_produtos' });

  Produto.associate = models => {
    models.produto.belongsTo(models.categoria, { foreignKey: 'categoriaId' });
  };

  return Produto;
};
