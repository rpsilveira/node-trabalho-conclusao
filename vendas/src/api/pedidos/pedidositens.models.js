import { Model } from 'sequelize';

export default (sequelize, dataTypes) => {
  class PedidoItem extends Model {}
  
  PedidoItem.init({
    produtoId: {
      type: dataTypes.INTEGER,
      references: {
        model: 'tb_produtos',
        key: 'id'
      }
    },
    quantidade: dataTypes.FLOAT
  }, { sequelize, modelName: 'pedidoItem', tableName: 'tb_pedidoItens' });

  PedidoItem.associate = models => {
    models.pedidoItem.belongsTo(models.pedido);
  };

  return PedidoItem;
};