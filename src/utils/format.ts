export function formatPrice(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function formatInstallment(price: number): string {
  const installment = (price / 6).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
  return `6x de ${installment} sem juros`;
}
