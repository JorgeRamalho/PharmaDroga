import type { PaymentMethod } from '@/types';

export const paymentMethods: PaymentMethod[] = [
  { id: 'visa', name: 'Visa', installments: 6, interestFree: true },
  { id: 'master', name: 'Mastercard', installments: 6, interestFree: true },
  { id: 'elo', name: 'Elo', installments: 6, interestFree: true },
  { id: 'amex', name: 'American Express', installments: 6, interestFree: true },
  { id: 'hiper', name: 'Hipercard', installments: 6, interestFree: true },
  { id: 'pix', name: 'PIX', installments: 1, interestFree: true },
];
