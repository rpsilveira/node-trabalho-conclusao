import { instances } from 'hapi-sequelizejs'
import { Model } from 'sequelize';
import { getObjectOr404 } from '../utils/database.utils';

export default (sequelize, dataTypes) => {
  class PedidoItem extends Model {}
  
  PedidoItem.init({
    quantidade: {
      type: dataTypes.REAL,
      validate: {
        async validaProd() {
          const Produto = instances.getModel('produto');
          const prod = await Produto.findOne({ where: { id: this.produtoId } });
          
          if (!prod) {
            throw new Error(`Produto id ${this.produtoId} não cadastrado!`);
          }
          else if (this.quantidade <= 0) {
            throw new Error(`Quantidade inválida para o produto ${prod.descricao}!`);
          }
          else if (this.valor <= 0) {
            throw new Error(`Valor inválido para o produto ${prod.descricao}!`);
          }
          else if (this.quantidade > prod.quantidade) {
            throw new Error(`Não há saldo disponível para o produto ${prod.descricao}! Saldo: ${prod.quantidade}`);
          }
        }
      }
    },
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
