import { Model } from 'sequelize';

export default (sequelize, dataTypes) => {
  class Produto extends Model {}

  Produto.init({
    descricao: dataTypes.STRING,
    quantidade: dataTypes.REAL,
    valor: {
      type: dataTypes.REAL,
      validate: {
        async validaValor(value) {
          if (value <= 0) {
            throw new Error('Valor inválido');
          }
        }
      }
    },
  }, { sequelize, modelName: 'produto', tableName: 'tb_produtos' });

  Produto.associate = models => {
    models.produto.belongsTo(models.categoria, { foreignKey: 'categoriaId' });
  };

  return Produto;
};
