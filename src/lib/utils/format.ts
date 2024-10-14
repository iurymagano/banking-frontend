import moment from 'moment';

export const formatDoc = (value: string) => {
  if (!value) return '';
  const numbers = value.replace(/\D/g, '');
  if (numbers.length <= 11) {
    // CPF
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  } else {
    // CNPJ
    return numbers.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      '$1.$2.$3/$4-$5',
    );
  }
};

export const formatDate = (date: Date) => {
  if (!date) return '';

  return moment(date).format('DD-MM-YYYY');
};

export const formatValor = (valor: string) => {
  const numero = valor.replace(/\D/g, '');
  const valorFormat = (Number(numero) / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
  return valorFormat;
};
