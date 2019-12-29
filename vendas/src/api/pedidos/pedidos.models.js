import { Model } from 'sequelize';

export default (sequelize, dataTypes) => {
  class Pedido extends Model {}
  
  Pedido.init({
    total: dataTypes.REAL
  }, { sequelize, modelName: 'pedido', tableName: 'tb_pedidos' });

  Pedido.associate = models => {
    models.pedido.belongsTo(models.cliente, { foreignKey: 'clienteId' } );
    models.pedido.hasMany(models.pedidoItem, { as: 'itens', foreignKey: 'pedidoId' });
  };

  Pedido.addHook('beforeSave', async (pedido) => {
    let totalProd = 0.0000;

    for (let i = 0; i < pedido.itens.length; i++) {
      totalProd += (pedido.itens[i].quantidade * pedido.itens[i].valor);
    };

    pedido.total = totalProd;
  });

  return Pedido;
};
