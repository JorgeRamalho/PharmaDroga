import { useState, type FormEvent } from 'react';
import { useLocale } from '@/hooks/useLocale';

type SubmitStatus = 'idle' | 'success' | 'error';

export function NewsletterBanner() {
  const { translate } = useLocale();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<SubmitStatus>('idle');

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValid) {
      setStatus('error');
      return;
    }

    setStatus('success');
    setEmail('');
  }

  return (
    <div className="react-banner">
      <div className="container">
        <form className="react-newsletter" onSubmit={handleSubmit}>
          <p>
            <strong>{translate('react.newsletter.title')}</strong>{' '}
            {translate('react.newsletter.desc')}
          </p>
          <div className="react-newsletter__form">
            <input
              type="email"
              placeholder={translate('react.newsletter.placeholder')}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status !== 'idle') setStatus('idle');
              }}
              className="react-newsletter__input"
              aria-label={translate('react.newsletter.emailLabel')}
            />
            <button type="submit" className="btn btn--coral">
              {translate('react.newsletter.submit')}
            </button>
          </div>
          {status === 'success' && (
            <span className="react-newsletter__feedback success" role="status" aria-live="polite">
              {translate('react.newsletter.success')}
            </span>
          )}
          {status === 'error' && (
            <span className="react-newsletter__feedback error" role="status" aria-live="assertive">
              {translate('react.newsletter.error')}
            </span>
          )}
        </form>
      </div>
    </div>
  );
}
