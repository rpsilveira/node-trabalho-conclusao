import * as validCpf from '@brazilian-utils/is-valid-cpf';
import * as validCnpj from '@brazilian-utils/is-valid-cnpj';
import formataCpf from '@brazilian-utils/format-cpf';
import formataCnpj from '@brazilian-utils/format-cnpj';

export function formataCnpjCpf(value) {

    const cnpjcpf = value.replace(/\D/g,'');

    if (cnpjcpf.length == 14)
      return formataCnpj(cnpjcpf);
    else if (cnpjcpf.length == 11)
      return formataCpf(cnpjcpf);
    else
      return value;
}

export function validaCnpjCpf(value) {
  return (validCpf.isValidCpf(value)) || (validCnpj.isValidCnpj(value));
}
