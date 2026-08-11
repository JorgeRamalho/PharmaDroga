import { useState } from 'react';
import { paymentMethods } from '@/data/payment-methods';
import { useLocale } from '@/hooks/useLocale';
import type { PaymentMethod } from '@/types';

function formatCurrency(value: number, locale: string): string {
  return value.toLocaleString(locale === 'en' ? 'en-US' : 'pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export function PaymentCalculator() {
  const { locale, translate } = useLocale();
  const [amount, setAmount] = useState(150);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(paymentMethods[0]);

  const pixDiscount = 0.05;
  const finalAmount = selectedMethod.id === 'pix' ? amount * (1 - pixDiscount) : amount;
  const installmentValue = finalAmount / selectedMethod.installments;

  return (
    <section className="react-payment-calc">
      <div className="container">
        <div className="react-payment-calc__inner">
          <div className="react-payment-calc__header">
            <span className="react-payment-calc__badge">React + TypeScript</span>
            <h2 className="react-payment-calc__title font-display">
              {translate('react.calculator.title')}
            </h2>
            <p className="react-payment-calc__desc">{translate('react.calculator.desc')}</p>
          </div>

          <div className="react-payment-calc__body">
            <div className="react-payment-calc__input-group">
              <label htmlFor="amount" className="react-payment-calc__label">
                {translate('react.calculator.amount')}
              </label>
              <input
                id="amount"
                type="range"
                min={10}
                max={1000}
                step={10}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="react-payment-calc__range"
              />
              <span className="react-payment-calc__amount font-price">
                {formatCurrency(amount, locale)}
              </span>
            </div>

            <div className="react-payment-calc__methods">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  type="button"
                  className={`react-payment-calc__method ${
                    selectedMethod.id === method.id ? 'active' : ''
                  }`}
                  onClick={() => setSelectedMethod(method)}
                >
                  {method.name}
                </button>
              ))}
            </div>

            <div className="react-payment-calc__result">
              {selectedMethod.id === 'pix' ? (
                <>
                  <span className="react-payment-calc__result-label">
                    {translate('react.calculator.pixDiscount')}
                  </span>
                  <span className="react-payment-calc__result-value font-price">
                    {formatCurrency(finalAmount, locale)}
                  </span>
                  <span className="react-payment-calc__result-installment">
                    {formatCurrency(amount - finalAmount, locale)}
                  </span>
                </>
              ) : (
                <>
                  <span className="react-payment-calc__result-label">
                    {selectedMethod.installments}x {translate('react.calculator.interestFree')} —{' '}
                    {selectedMethod.name}
                  </span>
                  <span className="react-payment-calc__result-value font-price">
                    {formatCurrency(installmentValue, locale)}
                  </span>
                  <span className="react-payment-calc__result-installment">
                    {translate('react.calculator.result')}: {formatCurrency(finalAmount, locale)}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
