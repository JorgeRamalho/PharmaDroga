import { getLocale, initLocale, setLocale, t, toggleLocale, type Locale } from '@/i18n';
import type { TranslationKey } from '@/i18n/translations';

function applyTranslations(locale: Locale = getLocale()): void {
  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n as TranslationKey | undefined;
    if (!key) return;

    const value = t(key, locale);

    if (el.dataset.i18nHtml === 'true') {
      el.innerHTML = value;
    } else if (el instanceof HTMLInputElement && el.placeholder !== undefined) {
      el.placeholder = value;
    } else {
      el.textContent = value;
    }
  });

  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.textContent = locale === 'pt' ? 'EN' : 'PT';
    langToggle.setAttribute('aria-label', t('header.langSwitch', locale));
  }
}

export function initI18n(): void {
  initLocale();
  applyTranslations();

  const langToggle = document.getElementById('langToggle');
  langToggle?.addEventListener('click', () => {
    toggleLocale();
    applyTranslations();
  });

  window.addEventListener('pharmadroga:locale-change', (event) => {
    const detail = (event as CustomEvent<{ locale: Locale }>).detail;
    applyTranslations(detail.locale);
  });
}

export { setLocale, t, getLocale };
