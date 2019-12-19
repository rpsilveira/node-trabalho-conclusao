import { Model } from 'sequelize';
import Bcrypt from 'bcryptjs';

export default (sequelize, dataTypes) => {
  class Cliente extends Model {}

  Cliente.init({
    nome: dataTypes.STRING,
    cnpjcpf: dataTypes.STRING,
    email: dataTypes.STRING,
    senha: dataTypes.STRING
  }, { sequelize, modelName: 'cliente', tableName: 'clientes' });

  /*Cliente.associate = models => {
    models.cliente.hasMany(models.post, { as: 'posts' });
  };*/

  Cliente.addHook('beforeCreate', async (cliente) => {
    const hash = await Bcrypt.hash(cliente.senha, 10);

    cliente.senha = hash;
  });

  return Cliente;
}
