import { Model } from 'sequelize';

export default (sequelize, dataTypes) => {
  class Produto extends Model {}

  Produto.init({
    descricao: dataTypes.STRING,
    quantidade: dataTypes.FLOAT,
    valor: dataTypes.FLOAT,
    categoriaId: { 
      type: dataTypes.INTEGER,
      references: {
        model: 'tb_categorias',
        key: 'id'
      }
    }
  }, { sequelize, modelName: 'produto', tableName: 'tb_produtos' });

 /* Produto.associate = models => {
    models.produto.belongsTo(models.categoria);
  }; */

  return Produto;
};
