import { Model } from 'sequelize';

export default (sequelize, dataTypes) => {
  class Categorias extends Model {}

  Categorias.init({
    descricao: dataTypes.STRING,
  }, { sequelize, modelName: 'categoria', tableName: 'categorias' });

  Categorias.associate = models => {
   // models.categoria.belongsTo(models.produto);
  };

  return Categorias;
};
