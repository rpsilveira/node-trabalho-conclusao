import { Model } from 'sequelize';

export default (sequelize, dataTypes) => {
  class Categoria extends Model {}

  Categoria.init({
    descricao: dataTypes.STRING,
  }, { sequelize, modelName: 'categoria', tableName: 'tb_categorias' });

  return Categoria;
};
