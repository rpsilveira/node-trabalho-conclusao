import { instances } from 'hapi-sequelizejs'
import { Model } from 'sequelize';
import { getObjectOr404 } from '../utils/database.utils';

export default (sequelize, dataTypes) => {
  class PedidoItem extends Model {}
  
  PedidoItem.init({
    quantidade: {
      type: dataTypes.REAL,
      validate: {
        validaQuant(value) {
          if (value <= 0) {
            throw new Error('Quantidade inválida!');
          }
        },
        async validaSaldo(value) {
          const Produto = instances.getModel('produto');
          const prod = await getObjectOr404(Produto, { where: { id: this.produtoId } });

          if ((prod.quantidade - value) <= 0) {
            throw new Error(`Não há saldo disponível para o produto ${prod.descricao}!`);
          }
        }
      }
    },
    valor: {
      type: dataTypes.REAL,
      validate: {
        validaQuant(value) {
          if (value <= 0) {
            throw new Error('Valor inválido!');
          }
        }
      }
    },
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
