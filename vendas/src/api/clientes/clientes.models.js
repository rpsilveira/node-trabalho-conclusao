import { Model } from 'sequelize';
import Bcrypt from 'bcryptjs';

export default (sequelize, dataTypes) => {
  class Cliente extends Model {}

  Cliente.init({
    email: dataTypes.STRING,
    password: dataTypes.STRING
  }, { sequelize, modelName: 'cliente', tableName: 'clientes' });

  /*Cliente.associate = models => {
    models.cliente.hasMany(models.post, { as: 'posts' });
  };*/

  Cliente.addHook('beforeCreate', async (cliente) => {
    const hash = await Bcrypt.hash(cliente.password, 10);

    cliente.password = hash;
  });

  return Cliente;
}
