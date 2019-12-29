import { Model } from 'sequelize';
import Bcrypt from 'bcryptjs';

export default (sequelize, dataTypes) => {
  class Cliente extends Model {}

  Cliente.init({
    nome: dataTypes.STRING,
    cnpjcpf: {
      type: dataTypes.STRING,
      unique: {
        args: true,
        msg: 'CNPJ/CPF já cadastrado!'
      }  
    },
    email: {
      type: dataTypes.STRING,
      validate: {
        isEmail: true
      },
      unique: {
        args: true,
        msg: 'E-mail já cadastrado!'
      }      
    },
    senha: dataTypes.STRING
  }, { sequelize, modelName: 'cliente', tableName: 'tb_clientes' });

  Cliente.addHook('beforeCreate', async (cliente) => {
    const hash = await Bcrypt.hash(cliente.senha, 10);

    cliente.senha = hash;
  });

  return Cliente;
}
