import { useTranslation } from 'react-i18next';

import { BaseLanguageToggle, type BaseLanguageToggleProps } from './BaseLanguageToggle';

export type LanguageToggleProps<T extends string> = Omit<BaseLanguageToggleProps<T>, 'onSelection' | 'selected'>;

export const LanguageToggle = <T extends string = string>(props: LanguageToggleProps<T>) => {
  const { i18n } = useTranslation();

  return (
    <BaseLanguageToggle
      selected={i18n.resolvedLanguage as T}
      onSelection={async (lang) => {
        await i18n.changeLanguage(lang);
      }}
      {...props}
    />
  );
};
