import { Model } from 'sequelize';

export default (sequelize, dataTypes) => {
  class Pedido extends Model {}
  
  Pedido.init({
    valor: dataTypes.FLOAT
  }, { sequelize, modelName: 'pedido', tableName: 'tb_pedidos' });

  Pedido.associate = models => {
    models.pedido.belongsTo(models.cliente, { foreignKey: 'clienteId' } );
    models.pedido.hasMany(models.pedidoItem, { as: 'itens', foreignKey: 'pedidoId' });
  };

  return Pedido;
};
