import { Model } from 'sequelize';

export default (sequelize, dataTypes) => {
  class PedidoItem extends Model {}
  
  PedidoItem.init({
    quantidade: dataTypes.REAL,
    valor: dataTypes.REAL,
    total: dataTypes.REAL
  }, { sequelize, modelName: 'pedidoItem', tableName: 'tb_pedidoItens' });

  PedidoItem.associate = models => {
    models.pedidoItem.belongsTo(models.pedido, { foreignKey: 'pedidoId' });
    models.pedidoItem.belongsTo(models.produto, { foreignKey: 'produtoId' });
  };

  PedidoItem.addHook('beforeSave', async (pedidoItem) => {
    pedidoItem.total = (pedidoItem.quantidade * pedidoItem.valor);
  });

  return PedidoItem;
};
