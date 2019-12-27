import { Model } from 'sequelize';

export default (sequelize, dataTypes) => {
  class PedidoItem extends Model {}
  
  PedidoItem.init({
    quantidade: dataTypes.FLOAT,
    valor: dataTypes.FLOAT
  }, { sequelize, modelName: 'pedidoItem', tableName: 'tb_pedidoItens' });

  PedidoItem.associate = models => {
    models.pedidoItem.belongsTo(models.pedido, { foreignKey: 'pedidoId' });
    models.pedidoItem.belongsTo(models.produto, { foreignKey: 'produtoId' });
  };

  return PedidoItem;
};
