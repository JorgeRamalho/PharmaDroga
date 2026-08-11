import { translations, type Locale, type TranslationKey } from '@/i18n/translations';

export type { Locale, TranslationKey };

const STORAGE_KEY = 'pharmadroga-locale';
const LOCALE_EVENT = 'pharmadroga:locale-change';

let currentLocale: Locale = 'pt';

function readStoredLocale(): Locale {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'pt' || stored === 'en') return stored;
  } catch {
    /* localStorage indisponível */
  }
  return 'pt';
}

export function getLocale(): Locale {
  return currentLocale;
}

export function t(key: TranslationKey, locale: Locale = currentLocale): string {
  return translations[locale][key] ?? translations.pt[key] ?? key;
}

export function setLocale(locale: Locale): void {
  if (locale === currentLocale) return;

  currentLocale = locale;

  try {
    localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    /* ignore */
  }

  document.documentElement.lang = locale === 'pt' ? 'pt-BR' : 'en';
  window.dispatchEvent(new CustomEvent(LOCALE_EVENT, { detail: { locale } }));
}

export function initLocale(): Locale {
  currentLocale = readStoredLocale();
  document.documentElement.lang = currentLocale === 'pt' ? 'pt-BR' : 'en';
  return currentLocale;
}

export function onLocaleChange(callback: (locale: Locale) => void): () => void {
  const handler = (event: Event) => {
    const detail = (event as CustomEvent<{ locale: Locale }>).detail;
    callback(detail.locale);
  };

  window.addEventListener(LOCALE_EVENT, handler);
  return () => window.removeEventListener(LOCALE_EVENT, handler);
}

export function toggleLocale(): Locale {
  const next = currentLocale === 'pt' ? 'en' : 'pt';
  setLocale(next);
  return next;
}
