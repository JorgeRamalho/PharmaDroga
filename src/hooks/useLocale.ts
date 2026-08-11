import { useEffect, useState } from 'react';
import { getLocale, onLocaleChange, t, type Locale } from '@/i18n';
import type { TranslationKey } from '@/i18n/translations';

export function useLocale(): { locale: Locale; translate: (key: TranslationKey) => string } {
  const [locale, setLocaleState] = useState<Locale>(getLocale);

  useEffect(() => onLocaleChange(setLocaleState), []);

  return {
    locale,
    translate: (key: TranslationKey) => t(key, locale),
  };
}
