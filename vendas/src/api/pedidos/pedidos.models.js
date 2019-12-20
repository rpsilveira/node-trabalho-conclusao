import { Model } from 'sequelize';

export default (sequelize, dataTypes) => {
  class Pedido extends Model {}

  Pedido.init({
    clienteId: { 
      type: dataTypes.INTEGER,
      references: {
        model: 'tb_clientes',
        key: 'id'
      }
    },
    valor: dataTypes.FLOAT
  }, { sequelize, modelName: 'pedido', tableName: 'tb_pedidos' });

 /* Pedido.associate = models => {
    models.pedido.hasMany(models.item, { as: 'itens' });
  }; */

  return Pedido;
};
