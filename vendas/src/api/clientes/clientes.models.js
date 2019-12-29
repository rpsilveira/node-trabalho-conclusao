import { Model } from 'sequelize';
import Bcrypt from 'bcryptjs';
import { formataCnpjCpf, validaCnpjCpf } from '../utils/cnpjcpf.utils';

export default (sequelize, dataTypes) => {
  class Cliente extends Model {}

  Cliente.init({
    nome: dataTypes.STRING,
    cnpjcpf: {
      type: dataTypes.STRING,
      unique: {
        args: true,
        msg: 'CNPJ/CPF já cadastrado!'
      },
      validate: {
        cnpjcpfValido(value) {
          if (!validaCnpjCpf(value)) {
            throw new Error('CNPJ/CPF inválido!');
          }
        },
      }
    },
    email: {
      type: dataTypes.STRING,
      unique: {
        args: true,
        msg: 'E-mail já cadastrado!'
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'E-mail inválido!'
        }
      }
    },
    senha: dataTypes.STRING
  }, { sequelize, modelName: 'cliente', tableName: 'tb_clientes' });

  Cliente.addHook('beforeSave', async (cliente) => {
    const hash = await Bcrypt.hash(cliente.senha, 10);
    const cnpjcpfFormatado = await formataCnpjCpf(cliente.cnpjcpf);

    cliente.senha = hash;
    cliente.cnpjcpf = cnpjcpfFormatado;
  });

  return Cliente;
}
